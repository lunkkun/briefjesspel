const EventEmitter = require('events').EventEmitter

class ResponseFactory extends EventEmitter {
  game

  constructor(game) {
    super()
    this.game = game
    this.attachHandlers()
  }

  send(userId, action, data = null) {
    this.emit('message', {userId, action, data})
  }

  sendToAll(action, data = null) {
    this.game.players.forEach((user) => {
      this.send(user.id, action, data)
    })
  }

  sendToOthers(userId, action, data = null) {
    this.game.players.forEach((user) => {
      if (user.id !== userId) {
        this.send(user.id, action, data)
      }
    })
  }

  attachHandlers() {
    this.game.on('playerNameSet', (user) => {
      this.sendToOthers(user.id, 'addPlayer', user.data)
    })

    this.game.on('playerRemoved', (user) => {
      this.sendToAll('removePlayer', user.data)
    })

    this.game.on('started', () => {
      this.sendToAll('start')
    })

    this.game.on('finished', () => {
      this.sendToAll('finish')
    })
  }

  static initialResponse(game) {
    return {
      action: 'initialize',
      data: game ? game.data : null,
    }
  }
}

module.exports = ResponseFactory
