const WebSocket = require('ws')

const messageHandler = require('./message-handler')

const wss = new WebSocket.Server({ clientTracking: false, noServer: true, path: '/ws/' })
const wsMap = new Map()

wss.on('connection', (ws, req) => {
  const userId = req.session.userId
  const gameId = req.session.gameId

  wsMap.set(userId, ws)

  console.debug(`Connected user ${userId} in game ${gameId}`)

  ws.on('message', (message) => {
    try {
      const parsed = JSON.parse(message)
      messageHandler.onMessage(parsed, userId, gameId)
    } catch (e) {
      console.error(`Could not process message ${message} from user ${userId} in game ${gameId}`)
      console.error(e)
    }
  })

  ws.on('close', () => {
    wsMap.delete(userId)
  })
})

module.exports = wss
