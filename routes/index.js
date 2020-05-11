const express = require('express');
const logger = require('../utils/logger')
const gameStore = require('../lib/game-store')
const User = require('../models/user')

const router = express.Router();

router.get('/:gamePath?', (req, res) => {
  const ip = req.ip || req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'].split(/, /)[0] : req.connection.remoteAddress

  let userId = req.session.userId
  if (!userId) {
    const user = new User()
    req.session.userId = userId = user.id
  }

  if (req.session.gameId) {
    const game = gameStore.get(req.session.gameId)
    if (game) {
      if (!game.players.has(userId)) {
        logger.info(`User ${userId} was removed from game ${req.session.gameId}`)
        delete(req.session.gameId)
      }
    } else {
      logger.warn(`Invalid game id ${req.session.gameId} for user ${userId}`)
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
            logger.debug(`User ${userId} was redirected to game ${game.id}`)
          } else {
            req.session.requestedGameId = game.id
            logger.debug(`User ${userId} has requested game ${game.id}`)
          }
        }
      } else if (game.players.has(userId)) {
        req.session.gameId = game.id
      } else if (game.isStarted) {
        logger.warn(`Game ${game.id} already started; could not add user ${userId}`)
      } else {
        game.addPlayer(new User({id: userId}))
        req.session.gameId = game.id
        logger.info(`Added user ${userId} with IP ${ip} to game ${game.id}`)
      }
    } else {
      logger.warn(`Invalid game path ${gamePath} for user ${userId}`)
    }
  }

  res.sendFile('index.html', {root: __dirname + '/../client/dist'})
})

module.exports = router;
