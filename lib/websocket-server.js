const WebSocket = require('ws')
const MessageHandler = require('./message-handler')
const ResponseFactory = require('./response-factory')
const gameStore = require('./game-store')

const wsServer = new WebSocket.Server({ clientTracking: false, noServer: true, path: '/ws/' })
const wsMap = new Map()
const send = (ws, type, payload) => ws.send(JSON.stringify({type, payload}))

wsServer.on('connection', (ws, req) => {
  const userId = req.session.userId
  const game = gameStore.get(req.session.gameId)
  const ms = new MessageHandler(req.session, game)

  wsMap.set(userId, ws)

  console.info(`Connected user ${userId}${game ? ` in game ${game.id}` : ''}`)

  send(ws, 'load', ResponseFactory.forLoad(userId, game))

  if (req.session.newGameId) {
    send(ws, 'requestToLeave')
  }

  ws.on('message', (message) => {
    try {
      const parsed = JSON.parse(message)
      ms.handle(parsed)
        .catch(e => {
          console.error(`Error processing message ${message} from user ${userId}${req.session.gameId ? ` in game ${req.session.gameId}` : ''}`)
          console.error(e)
        })
    } catch (e) {
      console.error(`Could not parse message ${message} from user ${userId}${req.session.gameId ? ` in game ${req.session.gameId}` : ''}`)
    }
  })

  ws.on('close', () => {
    wsMap.delete(userId)
    console.info(`Disconnected user ${userId}${req.session.gameId ? ` from game ${req.session.gameId}` : ''}`)
  })
})

const rfMap = new Map()

gameStore.on('newGame', (game) => {
  const responseFactory = new ResponseFactory(game)

  responseFactory.on('message', ({userId, type, payload}) => {
    const ws = wsMap.get(userId)
    if (ws) {
      console.debug(`Sending message ${type} to user ${userId} in game ${game.id}`)
      send(ws, type, payload)
    }
  })

  rfMap.set(game.id, responseFactory)

  game.emit('created')
})

gameStore.on('gameRemoved', (gameId) => {
  // cleanup responseFactory
  rfMap.get(gameId).removeAllListeners()
  rfMap.delete(gameId)
})

module.exports = wsServer
