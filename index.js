'use strict'

const crypto = require("crypto")
const express = require('express')
const http = require('http')
const session = require('express-session')
const WebSocket = require('ws')

const port = process.env.PORT || 4000
const appKey = process.env.APP_KEY || '$eCuRiTy'

const app = express()
const wsMap = new Map()

const sessionParser = session({
  saveUninitialized: false,
  secret: appKey,
  resave: false,
})

app.use(express.static('client/dist'))
app.use(sessionParser)

function createUserId() {
  return crypto.randomBytes(20).toString('hex')
}

app.get('/:gameId', function (request, response) {
  request.session.userId = createUserId()
  request.session.gameId = request.params.gameId

  response.sendFile('index.html', {root: __dirname + '/client/dist/'}, () => {
    response.end()
  })
})

const server = http.createServer(app)
const wss = new WebSocket.Server({ clientTracking: false, noServer: true, path: '/ws/' })

server.on('upgrade', function(request, socket, head) {
  sessionParser(request, {}, () => {
    if (!request.session.userId) {
      request.session.userId = createUserId()
    }

    wss.handleUpgrade(request, socket, head, function(ws) {
      wss.emit('connection', ws, request)
    })
  })
})

wss.on('connection', function(ws, request) {
  const userId = request.session.userId
  const gameId = request.session.gameId || null

  wsMap.set(userId, ws)

  console.log(`Connected user ${userId} in game ${gameId}`)

  ws.on('message', function(message) {
    console.log(`Received message ${message} from user ${userId} in game ${gameId}`)
  })

  ws.on('close', function() {
    wsMap.delete(userId)
  })
})

server.listen(port, () => {
  console.log(`listening on ${port}`)
})
