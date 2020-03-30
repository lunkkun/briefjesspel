const gameStore = require('./game-store')
const Team = require('../models/team')

class MessageHandler {
  session
  userId
  game

  constructor(session) {
    this.session = session
    this.userId = session.userId
    this.game = gameStore.get(session.gameId)
  }

  async handle({ action, data }) {
    console.debug(`Received message ${action} from user ${this.userId}${this.game ? ` in game ${this.game.id}` : ''}`)

    if (action && typeof(this[action]) === 'function') {
      this[action](data)
    }
    else {
      console.error(`Unknown action ${action} by user ${this.userId}${this.game ? ` in game ${this.game.id}` : ''}`)
    }
  }

  get isGameMaster() {
    return this.game.master === this.userId
  }



  // actions:

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
