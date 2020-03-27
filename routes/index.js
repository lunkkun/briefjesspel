const express = require('express');
const gameStore = require('../lib/game-store')
const User = require('../models/user')

const router = express.Router();

router.get('/:gamePath?', (req, res) => {
  const gamePath = req.params.gamePath

  if (!req.session.userId) {
    const user = new User()
    req.session.userId = user.id
  }

  if (gamePath && !req.session.gameId) {
    if (gameStore.byPath.has(gamePath)) {
      const game = gameStore.byPath.get(gamePath)
      game.addPlayer(req.session.userId)

      req.session.gameId = game.id
    } else {
      console.error(`Invalid game path ${gamePath} for user ${req.session.userId}`)
    }
  }

  res.sendFile('index.html', { root: __dirname + '/../client/dist'})
})

module.exports = router;
