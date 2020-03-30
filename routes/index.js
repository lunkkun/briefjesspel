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

  if (gamePath && !req.session.gameId) {
    const game = gameStore.byPath.get(gamePath)
    if (game) {
      if (!game.isStarted) {
        game.addPlayer(new User({id: userId}))
      }

      if (game.players.has(userId)) {
        req.session.gameId = game.id
      } else {
        console.error(`Game ${game.id} already started; could not add user ${userId}`)
      }
    } else {
      console.error(`Invalid game path ${gamePath} for user ${userId}`)
    }
  }

  res.sendFile('index.html', { root: __dirname + '/../client/dist'})
})

module.exports = router;
