const gameStore = require('./game-store')

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
    return this.game.isMaster(this.userId)
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

  startGame() {
    if (this.isGameMaster && this.game.canStart) {
      this.game.start()
    }
  }
}

module.exports = MessageHandler
