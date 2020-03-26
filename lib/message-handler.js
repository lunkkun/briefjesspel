class MessageHandler {
  userId
  gameId

  constructor(userId, gameId) {
    this.userId = userId
    this.gameId = gameId
  }

  async handle({ action, data }) {
    console.debug(`Received message ${action} from user ${userId} in game ${gameId}`)

    if (!action || !this.actions.hasOwnProperty(action)) {
      throw new Error(`Unknown action: ${action}`)
    }

    this.actions[action](data)
  }

  actions = {
    startNewGame(data) {
      // TODO
      console.debug(`Starting new game for user ${userId}`)
    }
  }
}

module.exports = MessageHandler
