const EventEmitter = require('events').EventEmitter

class ResponseFactory extends EventEmitter {
  game

  constructor(game) {
    super()
    this.game = game
    this.attachHandlers()
  }

  send(userId, mutation, data = null) {
    this.emit('message', {userId, mutation, data})
  }

  sendToAll(mutation, data = null) {
    this.game.players.forEach((user) => {
      this.send(user.id, mutation, data)
    })
  }

  sendToOthers(userId, mutation, data = null) {
    this.game.players.forEach((user) => {
      if (user.id !== userId) {
        this.send(user.id, mutation, data)
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

  static initialResponse(game, userId) {
    let data = null
    if (game) {
      data = game.data
      data.isMaster = game.master === userId
    }

    return {
      mutation: 'load',
      data: data,
    }
  }
}

module.exports = ResponseFactory
