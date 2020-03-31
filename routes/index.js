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

  let gameId = req.session.gameId
  if (gamePath && !gameId) {
    const game = gameStore.byPath.get(gamePath)
    if (game) {
      if (game.players.has(userId)) {
        req.session.gameId = gameId = game.id
      } else if (game.removedPlayers.has(userId)) {
        console.error(`User ${userId} was removed from game ${game.id}`)
      } else if (game.isStarted) {
        console.error(`Game ${game.id} already started; could not add user ${userId}`)
      } else {
        game.addPlayer(new User({id: userId}))
        req.session.gameId = gameId = game.id
      }
    } else {
      console.error(`Invalid game path ${gamePath} for user ${userId}`)
    }
  }

  if (gameId) {
    const game = gameStore.get(gameId)
    if (game) {
      if (game.removedPlayers.has(userId)) {
        console.error(`User ${userId} was removed from game ${gameId}`)
        delete(req.session.gameId)
      }
    } else {
      console.error(`Invalid game id ${gameId} for user ${userId}`)
      delete(req.session.gameId)
    }
  }

  res.sendFile('index.html', { root: __dirname + '/../client/dist'})
})

module.exports = router;
