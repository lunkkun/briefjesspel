const WebSocket = require('ws')
const MessageHandler = require('./message-handler')
const ResponseFactory = require('./response-factory')
const gameStore = require('./game-store')
const logger = require('../utils/logger')

const wsServer = new WebSocket.Server({ clientTracking: false, noServer: true, path: '/ws/' })
const wsMap = new Map()
const send = (ws, type, payload) => ws.send(JSON.stringify({type, payload}))

wsServer.on('connection', (ws, req) => {
  const userId = req.session.userId
  const game = gameStore.get(req.session.gameId)
  const ms = new MessageHandler(req.session, game)

  wsMap.set(userId, ws)

  logger.debug(`Connected user ${userId} ${game ? ` in game ${game.id}` : ''}`)

  send(ws, 'load', ResponseFactory.forLoad(userId, game))

  if (req.session.requestedGameId) {
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
      logger.error(`Could not parse message ${message} from user ${userId}${req.session.gameId ? ` in game ${req.session.gameId}` : ''}`)
    }
  })

  ws.on('close', () => {
    wsMap.delete(userId)
    logger.debug(`Disconnected user ${userId}${req.session.gameId ? ` from game ${req.session.gameId}` : ''}`)
  })
})

const rfMap = new Map()

gameStore.on('gameLoaded', (game) => {
  const responseFactory = new ResponseFactory(game)

  responseFactory.on('message', ({userId, type, payload}) => {
    const ws = wsMap.get(userId)
    if (ws) {
      logger.debug(`Sending message '${type}' to user ${userId} in game ${game.id}`)
      logger.trace('with payload', payload)
      send(ws, type, payload)
    } else {
      logger.error(`Could not send message '${type}' to user ${userId} in game ${game.id}`)
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
