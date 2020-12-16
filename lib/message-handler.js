const gameStore = require('./game-store')
const Team = require('../models/team')
const User = require('../models/user')
const logger = require('../utils/logger')

class MessageHandler {
  constructor(session, game) {
    this.session = session
    this.game = game
  }

  async handle({ type, payload }) {
    logger.debug(`Received message '${type}' from user ${this.userId}${this.game ? ` in game ${this.game.id}` : ''}`)
    logger.trace('with payload', payload)

    if (type && type !== 'handle' && !type.startsWith('_') && typeof(this[type]) === 'function') {
      this[type](payload)
    } else {
      logger.warn(`Unknown message type '${type}' by user ${this.userId}${this.game ? ` in game ${this.game.id}` : ''}`)
    }
  }

  get userId() {
    return this.session.userId
  }

  get isGameMaster() {
    return this.game.master === this.userId
  }

  get isActivePlayer() {
    return this.game.activePlayer === this.userId
  }


  // handlers:

  newGame() {
    const newGame = gameStore.newGameForUser(this.userId)

    this._setGame(newGame)
  }

  setPlayerName(name) {
    this.game.setPlayerName(this.userId, name)
  }

  setFont(font) {
    this.game.setFont(this.userId, font)
  }

  removePlayer(userId) {
    if (this.isGameMaster) {
      this.game.removePlayer(userId)
    }
  }

  leaveGame() {
    const currentGame = this.game

    if (this.session.requestedGameId) {
      if (gameStore.has(this.session.requestedGameId)) {
        const newGame = this._getRequestedGame()
        if (newGame) {
          newGame.addPlayer(new User({id: this.userId}))
          this._setGame(newGame)
          logger.info(`Added user ${this.userId} to game ${newGame.id}`)
        }
      }
    } else {
      this._removeGame()
    }

    if (currentGame) {
      currentGame.removePlayer(this.userId)
    }
  }

  stayInGame() {
    if (this.session.requestedGameId) {
      const newGame = this._getRequestedGame()
      if (newGame && newGame.players.has(this.userId)) {
        newGame.removePlayer(this.userId)
      }
    }
  }

  setEntriesPerPlayer(entriesPerPlayer) {
    if (this.isGameMaster) {
      this.game.setEntriesPerPlayer(parseInt(entriesPerPlayer))
    }
  }

  setContainer(container) {
    this.game.setContainer(container)
  }

  addEntry({index, entry}) {
    this.game.addEntry(this.userId, index, entry)
  }

  addTeam(name) {
    if (this.isGameMaster) {
      this.game.addTeam(new Team({name}))
    }
  }

  addPlayerToTeam({id, teamId}) {
    if (this.isGameMaster) {
      this.game.addPlayerToTeam(id, teamId)
    }
  }

  removePlayerFromTeam({id, teamId}) {
    if (this.isGameMaster) {
      this.game.removePlayerFromTeam(id, teamId)
    }
  }

  removeTeam(teamId) {
    if (this.isGameMaster) {
      this.game.removeTeam(teamId)
    }
  }

  setTurnTime(turnTime) {
    if (this.isGameMaster) {
      this.game.setTurnTime(parseInt(turnTime))
    }
  }

  startGame() {
    if (this.isGameMaster) {
      this.game.start()
    }
  }

  startRound() {
    if (this.isGameMaster) {
      this.game.startRound()
    }
  }

  startTurn() {
    if (this.isActivePlayer) {
      this.game.startTurn()
    }
  }

  nextEntry() {
    if (this.isActivePlayer) {
      this.game.nextEntry()
    }
  }

  finishTurn() {
    if (this.isActivePlayer || this.isGameMaster) {
      this.game.finishTurn()
    }
  }
  
  nextTurn() {
    if (this.isActivePlayer || this.isGameMaster) {
      this.game.nextTurn()
    }
  }

  nextRound() {
    if (this.isGameMaster) {
      this.game.nextRound()
    }
  }

  finishGame() {
    if (this.isGameMaster) {
      this.game.finish()
    }
  }

  newGameFromCurrent() {
    if (this.isGameMaster) {
      const currentGame = this.game
      const newGame = gameStore.newGameFromExisting(this.game)
      this._setGame(newGame)
      currentGame.redirect(newGame)
    }
  }


  // private methods

  _getRequestedGame() {
    const newGame = gameStore.get(this.session.requestedGameId)

    delete(this.session.requestedGameId)
    this.session.save()

    return newGame
  }

  _setGame(game) {
    this.game = game

    this.session.gameId = game.id
    this.session.save()
  }

  _removeGame() {
    this.game = null

    delete(this.session.gameId)
    this.session.save()
  }
}

module.exports = MessageHandler
