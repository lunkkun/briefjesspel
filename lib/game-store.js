const {EventEmitter} = require('events')
const Game = require('../models/game')
const logger = require('../utils/logger')
const dbSet = require('../utils/mongodb-client').db().collection('games')

const sweepEnabled = process.env.GAMESTORE_SWEEP_ENABLED === 'true'
const sweepInterval = parseInt(process.env.GAMESTORE_SWEEP_INTERVAL) || 3600 // in seconds
const archiveThreshold = parseInt(process.env.GAMESTORE_ARCHIVE_THRESHOLD) || 7200 // in seconds

class GameStore extends EventEmitter {
  constructor() {
    super()
    this.games = new Map()
    this.byPath = new Map()

    if (sweepEnabled) {
      logger.info(`Sweeping game store every ${sweepInterval} seconds`)
      setInterval(this._sweep.bind(this), sweepInterval * 1000)
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
    await dbSet.createIndex({isArchived: 1})

    const threshold = Date.now() - archiveThreshold * 1000

    const games = await dbSet.find({isArchived: false})
    games.forEach((data) => {
      if (data.updatedAt.getTime() < threshold) {
        data.isArchived = true
        this._saveGame(data)
      } else {
        this._loadGame(new Game(data))
      }
    })
  }


  // private methods

  _loadGame(game) {
    this.games.set(game.id, game)
    this.byPath.set(game.path, game)

    logger.debug(`Loaded game ${game.id} with path ${game.path} and master ${game.master}`)
    logger.trace(game)

    this.emit('gameLoaded', game)

    game.on('changed', () => {
      this._saveGame(game)
    })
  }

  _newGame(data) {
    const game = new Game(data)

    this._storeGame(game)

    logger.info(`Started new game ${game.id} with master ${game.master}`)

    this._loadGame(game)

    return game
  }

  _storeGame(game) {
    logger.debug(`Storing game ${game.id}`)

    dbSet.insertOne(game)
      .then(result => game._id = result.insertedId)
      .catch((err) => {
        logger.error(`Could not store game ${game.id}: `, err)
      })
  }

  _saveGame(game) {
    logger.debug(`Saving game ${game.id}`)
    logger.trace(game)

    dbSet.replaceOne({_id: game._id}, game)
      .catch((err) => {
        logger.error(`Could not save game ${game.id}: `, err)
      })
  }

  _removeGame(game) {
    game.removeAllListeners()

    this.games.delete(game.id)
    this.byPath.delete(game.path)

    logger.debug(`Removed ${game.id} from store`)
    logger.trace(game)

    this.emit('gameRemoved', game.id)
  }

  /**
   * Cleanup games that haven't been updated in a while
   */
  _sweep() {
    logger.debug('Sweeping game store...')

    const threshold = Date.now() - archiveThreshold * 1000

    const checked = this.games.size
    let removed = 0
    this.games.forEach((game) => {
      if (game.updatedAt.getTime() < threshold) {
        game.archive()
        this._removeGame(game)
        removed++
      }
    })

    logger.info(`Swept ${removed}/${checked} games from the store`)
  }
}

const store = new GameStore()
store.loadGames()
  .catch((err) => {
    logger.error('Could not active load games into game store: ', err)
  })

module.exports = store
