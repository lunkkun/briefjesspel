'use strict'

// load environment
const port = process.env.PORT || 4000
const appKey = process.env.APP_KEY || '$eCuRiTy'

// load external dependencies
const express = require('express')
const http = require('http')
const session = require('express-session')

// create shared sessionParser for http & ws
const sessionParser = session({
  saveUninitialized: true,
  secret: appKey,
  resave: false,
})

async function init() {
  // connect to DB
  await require('./utils/db').connect()

  // load remaining internal dependencies
  const wsServer = require('./lib/websocket-server')
  const routes = require('./routes/index')
  const User = require('./models/user')

  // create app
  const app = express()

  app.use(sessionParser)
  app.use(express.static('client/dist', {index: '_'}))
  app.use('/', routes)

  // create server
  const server = http.createServer(app)

  server.on('upgrade', (req, socket, head) => {
    sessionParser(req, {}, () => {
      if (!req.session.userId) {
        const user = new User()
        req.session.userId = user.id
      }

      wsServer.handleUpgrade(req, socket, head, function (ws) {
        wsServer.emit('connection', ws, req)
      })
    })
  })

  server.listen(port, () => {
    console.log(`listening on ${port}`)
  })
}

init()
  .catch((err) => {
    console.error(`Error initializing server:`, err)
  })
