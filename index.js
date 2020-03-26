'use strict'

// load environment
const port = process.env.PORT || 4000
const appKey = process.env.APP_KEY || '$eCuRiTy'

// load external dependencies
const express = require('express')
const http = require('http')
const session = require('express-session')

// load internal dependencies
const routes = require('./routes/index')
const wss = require('./lib/websocket-server')

const sessionParser = session({
  saveUninitialized: true,
  secret: appKey,
  resave: false,
})

const app = express()

app.use(sessionParser)
app.use(express.static('client/dist', { index: '_' }))
app.use('/', routes)

const server = http.createServer(app)

server.on('upgrade', (req, socket, head) => {
  sessionParser(req, {}, () => {
    if (!req.session.userId) {
      socket.destroy();
      return;
    }

    wss.handleUpgrade(req, socket, head, function(ws) {
      wss.emit('connection', ws, req)
    })
  })
})

server.listen(port, () => {
  console.log(`listening on ${port}`)
})
