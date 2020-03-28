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
    this.game.on('created', () => {
      this.send(this.game.master, 'setPath', this.game.path)
    })

    this.game.on('playerNameSet', (user) => {
      this.sendToAll('addPlayer', user.data)
    })

    this.game.on('playerNameUpdated', (user) => {
      this.sendToOthers(user.id, 'updatePlayer', user.data)
    })

    this.game.on('playerRemoved', (user) => {
      this.sendToOthers(this.game.master, 'removePlayer', user.name)
    })

    this.game.on('entriesPerPlayerUpdated', () => {
      this.sendToOthers(this.game.master, 'setEntriesPerPlayer', this.game.entriesPerPlayer)
    })

    this.game.on('canStart', () => {
      this.send(this.game.master, 'setCanStart', true)
    })

    this.game.on('cannotStart', () => {
      this.send(this.game.master, 'setCanStart', false)
    })

    this.game.on('started', () => {
      this.sendToAll('start')
    })

    this.game.on('finished', () => {
      this.sendToAll('finish')
    })
  }

  static initialResponse(userId, game = null) {
    let data = {
      userId,
      game: null,
    }

    if (game) {
      data.game = game.dataForUser(userId)
    }

    return {
      mutation: 'load',
      data: data,
    }
  }
}

module.exports = ResponseFactory
