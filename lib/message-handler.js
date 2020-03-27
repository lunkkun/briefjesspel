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

    if (!action || !this.hasOwnProperty(action)) {
      console.error(`Unknown action ${action} by user ${this.userId}${this.game ? ` in game ${this.game.id}` : ''}`)
    }

    this[action](data)
  }


  // actions:

  startNewGame({notesPerPlayer}) {
    this.game = gameStore.newGame({notesPerPlayer})
    this.game.addPlayer(this.userId, true)
    this.session.gameId = this.game.id
    this.session.save()

    console.debug(`Started new game ${this.game.id} for user ${this.userId}`)
  }

  startNewFromExisting() {
    this.game = gameStore.newGameFromExisting(this.game)
    this.session.gameId = this.game.id
    this.session.save()
  }

  setPlayerName({name}) {

  }
}

module.exports = MessageHandler
