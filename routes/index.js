const express = require('express');
const gameStore = require('../lib/game-store')
const User = require('../models/user')

const router = express.Router();

router.get('/:gameUri?', (req, res) => {
  const gameUri = req.params.gameUri

  if (!req.session.userId) {
    const user = new User()
    req.session.userId = user.id
  }

  if (gameUri && !req.session.gameId) {
    if (gameStore.gamesByUri.has(gameUri)) {
      const game = gameStore.gamesByUri.get(gameUri)
      req.session.gameId = game.id
    } else {
      console.error(`Invalid game uri ${gameUri} for user ${req.session.userId}`)
    }
  }

  res.sendFile('index.html', { root: __dirname + '/../client/dist'})
})

module.exports = router;
