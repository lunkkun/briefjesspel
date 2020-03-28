const WebSocket = require('ws')
const MessageHandler = require('./message-handler')
const ResponseFactory = require('./response-factory')
const gameStore = require('./game-store')

const wss = new WebSocket.Server({ clientTracking: false, noServer: true, path: '/ws/' })
const wsMap = new Map()

wss.on('connection', (ws, req) => {
  const userId = req.session.userId
  const gameId = req.session.gameId
  const ms = new MessageHandler(req.session)

  wsMap.set(userId, ws)

  console.info(`Connected user ${userId}${gameId ? ` in game ${gameId}` : ''}`)

  ws.send(JSON.stringify(ResponseFactory.initialResponse(userId, ms.game)))

  ws.on('message', (message) => {
    try {
      const parsed = JSON.parse(message)
      ms.handle(parsed)
        .catch(e => {
          console.error(`Error processing message ${message} from user ${userId}${gameId ? ` in game ${gameId}` : ''}`)
          console.error(e)
        })
    } catch (e) {
      console.error(`Could not parse message ${message} from user ${userId}${gameId ? ` in game ${gameId}` : ''}`)
    }
  })

  ws.on('close', () => {
    wsMap.delete(userId)
  })
})

gameStore.on('newGame', (game) => {
  const responseFactory = new ResponseFactory(game)

  responseFactory.on('message', ({userId, mutation, data}) => {
    const ws = wsMap.get(userId)
    if (ws) {
      console.debug(`Sending message ${mutation} to user ${userId} in game ${game.id}`)
      ws.send(JSON.stringify({mutation, data}))
    }
  })

  game.emit('created')
})

module.exports = wss
