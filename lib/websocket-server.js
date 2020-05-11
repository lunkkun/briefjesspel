const WebSocket = require('ws')
const uuid = require('uuid')
const MessageHandler = require('./message-handler')
const ResponseFactory = require('./response-factory')
const gameStore = require('./game-store')
const logger = require('../utils/logger')
const User = require('../models/user')

const wsServer = new WebSocket.Server({noServer: true, path: '/ws/'})
const userMap = new Map()

function send(ws, type, payload) {
  ws.send(JSON.stringify({type, payload}))
}

function noop() {}

function heartbeat() {
  this.isAlive = true
}

wsServer.on('connection', (ws, req) => {
  const userId = req.session.userId
  const game = gameStore.get(req.session.gameId)
  const ms = new MessageHandler(req.session, game)

  ws.id = uuid.v4()
  ws.isAlive = true
  ws.on('pong', heartbeat)

  //
  if (!userMap.has(userId)) {
    userMap.set(userId, new Map())
  }
  const wsMap = userMap.get(userId)
  wsMap.set(ws.id, ws)

  logger.debug(`Connected user ${userId}${game ? ` in game ${game.id}` : ''} on ws ${ws.id}`)

  if (game && !game.players.has(userId)) {
    game.addPlayer(new User({id: userId}))
    logger.info(`Added user ${userId} to game ${game.id}`)
  }

  let payload = ResponseFactory.forLoad(userId, game)
  logger.debug(`Sending message 'load' to user ${userId}${game ? ` in game ${game.id}` : ''} on ws ${ws.id}`)
  logger.trace('with payload', payload)
  send(ws, 'load', payload)

  if (req.session.requestedGameId) {
    logger.debug(`Sending message 'requestToLeave' to user ${userId}${game ? ` in game ${game.id}` : ''} on ws ${ws.id}`)
    send(ws, 'requestToLeave')
  }

  ws.on('message', (message) => {
    try {
      const parsed = JSON.parse(message)
      ms.handle(parsed)
        .catch((err) => {
          logger.error(`Error processing message ${message} from user ${userId}${req.session.gameId ? ` in game ${req.session.gameId}` : ''}: `, err)
        })
    } catch (err) {
      logger.error(`Could not parse message ${message} from user ${userId}${req.session.gameId ? ` in game ${req.session.gameId}` : ''} on ws ${ws.id}`)
    }
  })

  ws.on('close', () => {
    wsMap.delete(ws.id)
    logger.debug(`Disconnected ws ${ws.id} for user ${userId}${req.session.gameId ? ` in game ${req.session.gameId}` : ''}`)
    if (wsMap.size === 0) {
      userMap.delete(userId)
      logger.debug(`Disconnected user ${userId}${req.session.gameId ? ` in game ${req.session.gameId}` : ''}`)
    }
  })
})

const interval = setInterval(() => {
  wsServer.clients.forEach(ws => {
    if (!ws.isAlive) {
      return ws.terminate()
    }

    ws.isAlive = false
    ws.ping(noop)
  })
}, 10 * 1000) // every 10 seconds

wsServer.on('close', () => {
  clearInterval(interval)
})

const rfMap = new Map()

gameStore.on('gameLoaded', (game) => {
  const responseFactory = new ResponseFactory(game)

  responseFactory.on('message', ({userId, type, payload}) => {
    if (userMap.has(userId)) {
      const wsMap = userMap.get(userId)
      for (const ws of wsMap.values()) {
        if (ws && ws.readyState === WebSocket.OPEN) {
          logger.debug(`Sending message '${type}' to user ${userId} in game ${game.id} on ws ${ws.id}`)
          logger.trace('with payload', payload)
          send(ws, type, payload)
        } else {
          logger.error(`Could not send message '${type}' to user ${userId} in game ${game.id} on ws ${ws ? ws.id : 'null'}`)
        }
      }
    } else {
      logger.warn(`Could not send message '${type}' to disconnected user ${userId} in game ${game.id}`)
    }
  })

  rfMap.set(game.id, responseFactory)

  game.emit('loaded')
})

gameStore.on('gameRemoved', (gameId) => {
  // cleanup responseFactory
  rfMap.get(gameId).removeAllListeners()
  rfMap.delete(gameId)
})

module.exports = wsServer
