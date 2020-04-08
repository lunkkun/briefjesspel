const express = require('express');
const gameStore = require('../lib/game-store')
const User = require('../models/user')

const router = express.Router();

router.get('/:gamePath?', (req, res) => {
  let userId = req.session.userId
  if (!userId) {
    const user = new User()
    req.session.userId = userId = user.id
  }

  if (req.session.gameId) {
    const game = gameStore.get(req.session.gameId)
    if (game) {
      if (!game.players.has(userId)) {
        console.info(`User ${userId} was removed from game ${req.session.gameId}`)
        delete(req.session.gameId)
      }
    } else {
      console.info(`Invalid game id ${req.session.gameId} for user ${userId}`)
      delete(req.session.gameId)
    }
  }

  const gamePath = req.params.gamePath
  if (gamePath) {
    const game = gameStore.byPath.get(gamePath)
    if (game) {
      if (req.session.gameId) {
        if (req.session.gameId !== game.id) {
          const previousGame = gameStore.get(req.session.gameId)
          if (previousGame && previousGame.redirectPath === gamePath) {
            req.session.gameId = game.id
            console.debug(`User ${userId} was redirected to game ${game.id}`)
          } else {
            req.session.requestedGameId = game.id
            console.debug(`User ${userId} has requested game ${game.id}`)
          }
        }
      } else if (game.players.has(userId)) {
        req.session.gameId = game.id
      } else if (game.isStarted) {
        console.error(`Game ${game.id} already started; could not add user ${userId}`)
      } else {
        game.addPlayer(new User({id: userId}))
        req.session.gameId = game.id
        console.log(`Added user ${userId} to game ${game.id}`)
      }
    } else {
      console.error(`Invalid game path ${gamePath} for user ${userId}`)
    }
  }

  res.sendFile('index.html', { root: __dirname + '/../client/dist'})
})

module.exports = router;
