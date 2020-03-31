const express = require('express');
const gameStore = require('../lib/game-store')
const User = require('../models/user')

const router = express.Router();

router.get('/:gamePath?', (req, res) => {
  const gamePath = req.params.gamePath

  let userId = req.session.userId
  if (!userId) {
    const user = new User()
    req.session.userId = userId = user.id
  }

  if (req.session.gameId) {
    const game = gameStore.get(req.session.gameId)
    if (game) {
      if (game.removedPlayers.has(userId)) {
        console.info(`User ${userId} was removed from game ${req.session.gameId}`)
        delete(req.session.gameId)
      }
    } else {
      console.info(`Invalid game id ${req.session.gameId} for user ${userId}`)
      delete(req.session.gameId)
    }
  }

  if (gamePath) {
    const game = gameStore.byPath.get(gamePath)
    if (game) {
      if (req.session.gameId) {
        if (req.session.gameId !== game.id) {
          req.session.newGameId = game.id
        }
      } else if (game.players.has(userId)) {
        req.session.gameId = game.id
      } else if (game.removedPlayers.has(userId)) {
        console.error(`User ${userId} was denied access to game ${game.id}`)
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
