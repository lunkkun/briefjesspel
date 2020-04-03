const EventEmitter = require('events').EventEmitter
const Game = require('../models/game')
const User = require('../models/user')

class GameStore extends EventEmitter {
  constructor() {
    super()
    this.games = new Map()
    this.byPath = new Map()

    if (process.env.NODE_ENV === 'production') {
      // Every hour, check if we should cleanup any old games
      setInterval(this._sweep.bind(this), 60 * 60 * 1000)
    }
  }


  // public methods

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
    // TODO: carry over more data?
    const players = new Map()
    game.players.forEach(({id, name, font}) => {
      players.set(id, new User({id, name, font}))
    })

    return this._newGame({
      players,
      master: game.master,
    })
  }


  // private methods

  _newGame(data) {
    const game = new Game(data)

    console.info(`Started new game ${game.id} with master ${game.master}`)

    this.games.set(game.id, game)
    this.byPath.set(game.path, game)

    this.emit('newGame', game)

    return game
  }

  _removeGame(game) {
    game.removeAllListeners()

    this.games.delete(game.id)
    this.byPath.delete(game.path)

    this.emit('gameRemoved', game.id)

    console.info(`Removed ${game.id} from store`)
  }

  /// Cleanup games that haven't been updated in a while
  _sweep() {
    console.debug('Sweeping game store...')

    // two hours ago
    const threshold = Date.now() - 2 * 60 * 60 * 1000

    this.games.forEach((game) => {
      if (game.updatedAt.getTime() < threshold) {
        game.archive()
        this._removeGame(game)
      }
    })
  }


  // data load methods

  async loadGames() {
    // TODO: load all active games from DB
  }
}

const store = new GameStore()
store.loadGames()
  .catch((err) => {
    console.error('Could not active load games into game store')
    console.error(err)
  })

module.exports = store
