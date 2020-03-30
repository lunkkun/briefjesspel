const gameStore = require('./game-store')
const Team = require('../models/team')

class MessageHandler {
  session
  game

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



  // handlers:

  newGame() {
    this.game = gameStore.newGame(this.userId)
    this.session.gameId = this.game.id
    this.session.save()

    console.info(`Started new game ${this.game.id} for user ${this.userId}`)
  }

  newFromExisting() {
    if (this.isGameMaster) {
      this.game = gameStore.newGameFromExisting(this.game)
      this.session.gameId = this.game.id
      this.session.save()
    }
  }

  removePlayer(userId) {
    if (this.isGameMaster) {
      this.game.removePlayer(userId)
    }
  }

  setPlayerName(name) {
    this.game.setPlayerName(this.userId, name)
  }

  setEntriesPerPlayer(entriesPerPlayer) {
    if (this.isGameMaster) {
      this.game.setEntriesPerPlayer(entriesPerPlayer)
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

  removeTeam(teamId) {
    if (this.isGameMaster) {
      this.game.removeTeam(teamId)
    }
  }

  addPlayerToTeam({id, teamId}) {
    if (this.isGameMaster) {
      this.game.addPlayerToTeam(id, teamId)
    }
  }

  startGame() {
    if (this.isGameMaster) {
      this.game.start()
    }
  }
}

module.exports = MessageHandler
