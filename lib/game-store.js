const EventEmitter = require('events').EventEmitter
const Game = require('../models/game')

class GameStore extends EventEmitter {
  games = new Map()
  gamesByUri = new Map()

  newGame() {
    const game = new Game()
    this.games.set(game.id, game)
    this.gamesByUri.set(game.uri, game)
  }

  static load() {
    const store = new GameStore()

    // TODO: load all active games from DB

    return store
  }
}

module.exports = GameStore.load()
