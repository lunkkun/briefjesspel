const EventEmitter = require('events').EventEmitter
const Game = require('../models/game')

class GameStore extends EventEmitter {
  games = new Map()
  byPath = new Map()

  has(gameId) {
    return this.games.has(gameId)
  }

  get(gameId) {
    return this.games.get(gameId)
  }

  newGameForUser(user) {
    const players = new Map([[user.id, user]])
    return this._newGame({players, master: user.id})
  }

  newGameFromExisting(game) {
    // TODO: carry over more than just the players?
    const data = {players: game.players, master: game.master}
    return this._newGame(data)
  }

  _newGame(data) {
    const game = new Game(data)

    this.games.set(game.id, game)
    this.byPath.set(game.path, game)

    this.emit('newGame', game)

    game.on('finished', () => this._onFinished(game))

    console.info(`Started new game ${game.id} with master ${game.master}`)

    return game
  }

  _onFinished(game) {
    // cleanup from GameStore after 1 hour
    setTimeout(() => {
      game.removeAllListeners()

      this.games.delete(game.id)
      this.byPath.delete(game.path)

      this.emit('gameRemoved', game.id)
    }, 60 * 60 * 1000);
  }

  async loadGames() {
    // TODO: load all active games from DB
  }
}

const store = new GameStore()
store.loadGames()

module.exports = store
