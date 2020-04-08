const {EventEmitter} = require('events')
const dbSet = require('../utils/db').db.collection('games')
const Game = require('../models/game')

class GameStore extends EventEmitter {
  archiveInterval = 2 * 60 * 60 * 1000 // two hours ago

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

  newGameForUser(userId) {
    const players = Object.fromEntries([[userId, {id: userId}]])
    return this._newGame({players, master: userId})
  }

  newGameFromExisting(game) {
    // TODO: carry over more data?
    const players = {}
    game.players.forEach(({id, name, font}) => {
      players[id] = {id, name, font}
    })

    return this._newGame({
      players,
      master: game.master,
    })
  }

  async loadGames() {
    const games = await dbSet.find({isArchived: false})
    games.forEach((data) => {
      this._loadGame(new Game(data))
    })
  }


  // private methods

  _loadGame(game) {
    this.games.set(game.id, game)
    this.byPath.set(game.path, game)

    game.on('changed', () => {
      this._saveGame(game)
    })

    this.emit('gameLoaded', game)
  }

  _newGame(data) {
    const game = new Game(data)

    this._storeGame(game)

    console.info(`Started new game ${game.id} with master ${game.master}`)

    this._loadGame(game)

    return game
  }

  _storeGame(game) {
    dbSet.insertOne(game)
      .catch((err) => {
        console.err(`Could not store game ${game.id}:`, err)
      })
  }

  _saveGame(game) {
    dbSet.updateOne({id: game.id}, game)
      .catch((err) => {
        console.err(`Could not save game ${game.id}:`, err)
      })
  }

  _removeGame(game) {
    game.removeAllListeners()

    this.games.delete(game.id)
    this.byPath.delete(game.path)

    this.emit('gameRemoved', game.id)

    console.info(`Removed ${game.id} from store`)
  }

  /**
   * Cleanup games that haven't been updated in a while
   */
  _sweep() {
    console.debug('Sweeping game store...')

    const threshold = Date.now() - this.archiveInterval

    this.games.forEach((game) => {
      if (game.updatedAt.getTime() < threshold) {
        game.archive()
        this._removeGame(game)
      }
    })
  }
}

const store = new GameStore()
store.loadGames()
  .catch((err) => {
    console.error('Could not active load games into game store:', err)
  })

module.exports = store
