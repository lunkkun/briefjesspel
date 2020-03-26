module.exports = {
  onMessage: function (message, userId, gameId) {
    console.debug(`Received message ${message.action} from user ${userId} in game ${gameId}`)
    // TODO
  }
}
