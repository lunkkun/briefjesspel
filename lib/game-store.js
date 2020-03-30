const EventEmitter = require('events').EventEmitter
const Game = require('../models/game')
const User = require('../models/user')

class GameStore extends EventEmitter {
  games = new Map()
  byPath = new Map()

  has(gameId) {
    return this.games.has(gameId)
  }

  get(gameId) {
    return this.games.get(gameId)
  }

  newGame(userId) {
    const game = new Game()
    game.addPlayer(new User({id: userId}), true)

    this.games.set(game.id, game)
    this.byPath.set(game.path, game)

    game.on('finished', () => {
      // cleanup from GameStore after 1 hour
      setTimeout(() => {
        this.games.delete(game.id)
        this.byPath.delete(game.path)
      }, 60 * 60 * 1000);
    })

    this.emit('newGame', game)

    return game
  }

  newGameFromExisting(game) {
    // TODO
    const data = {}
    return this.newGame(data)
  }

  async loadGames() {
    // TODO: load all active games from DB
  }
}

const store = new GameStore()
store.loadGames()

module.exports = store
