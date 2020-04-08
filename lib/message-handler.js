const gameStore = require('./game-store')
const Team = require('../models/team')

class MessageHandler {
  constructor(session, game) {
    this.session = session
    this.game = game
  }

  async handle({ type, payload }) {
    console.debug(`Received message ${type} from user ${this.userId}${this.game ? ` in game ${this.game.id}` : ''}`)

    if (type && typeof(this[type]) === 'function') {
      this[type](payload)
    }
    else {
      console.error(`Unknown message type ${type} by user ${this.userId}${this.game ? ` in game ${this.game.id}` : ''}`)
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
    this.game = gameStore.newGameForUser(this.userId)

    this.session.gameId = this.game.id
    this.session.save()
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
    if (this.session.newGameId) {
      this.session.gameId = this.session.newGameId
      delete(this.session.newGameId)
    } else {
      delete(this.session.gameId)
    }

    this.session.save()
    this.game.removePlayer(this.userId, true)
  }

  stayInCurrentGame() {
    const newGame = gameStore.get(this.session.newGameId)
    if (newGame && newGame.players.has(this.userId)) {
      newGame.removePlayer(this.userId, true)
    }

    delete(this.session.newGameId)
    this.session.save()
  }

  setEntriesPerPlayer(entriesPerPlayer) {
    if (this.isGameMaster) {
      this.game.setEntriesPerPlayer(parseInt(entriesPerPlayer))
    }
  }

  addEntry(entry) {
    this.game.addEntry(this.userId, entry)
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
      const newGame = gameStore.newGameFromExisting(this.game)
      this.game.redirect(newGame)
      this.game = newGame

      this.session.gameId = newGame.id
      this.session.save()
    }
  }
}

module.exports = MessageHandler
