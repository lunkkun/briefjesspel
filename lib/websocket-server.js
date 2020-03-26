const WebSocket = require('ws')
const MessageHandler = require('./message-handler')

const wss = new WebSocket.Server({ clientTracking: false, noServer: true, path: '/ws/' })
const wsMap = new Map()

wss.on('connection', (ws, req) => {
  const userId = req.session.userId
  const gameId = req.session.gameId

  wsMap.set(userId, ws)

  console.debug(`Connected user ${userId} in game ${gameId}`)

  const ms = new MessageHandler(userId, gameId)

  ws.on('message', (message) => {
    try {
      const parsed = JSON.parse(message)
      ms.handle(parsed)
    } catch (e) {
      console.error(`Could not parse message ${message} from user ${userId} in game ${gameId}`)
    }
  })

  ws.on('close', () => {
    wsMap.delete(userId)
  })
})

module.exports = wss
