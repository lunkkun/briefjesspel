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
  saveUninitialized: true,
  secret: appKey,
  resave: false,
})

app.use(sessionParser)
app.use(express.static('client/dist', { index: '_' }))

app.get('/:gameId?', function (req, res) {
  if (!req.session.userId) {
    req.session.userId = crypto.randomBytes(16).toString('hex')
  }
  if (!req.session.gameId) {
    req.session.gameId = req.params.gameId
  }

  res.sendFile('index.html', {root: __dirname + '/client/dist/'}, () => {
    res.end()
  })
})

const server = http.createServer(app)
const wss = new WebSocket.Server({ clientTracking: false, noServer: true, path: '/ws/' })

server.on('upgrade', function(req, socket, head) {
  sessionParser(req, {}, () => {
    wss.handleUpgrade(req, socket, head, function(ws) {
      wss.emit('connection', ws, req)
    })
  })
})

wss.on('connection', function(ws, req) {
  const userId = req.session.userId
  const gameId = req.session.gameId

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
