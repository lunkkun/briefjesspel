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

    this.game.on('playerAdded', (user) => {
      this.sendToOthers(user.id, 'addPlayer', user.data)
    })

    this.game.on('playerNameSet', (user) => {
      this.sendToOthers(user.id, 'setPlayerName', {id: user.id, name: user.name})
    })

    this.game.on('playerRemoved', (userId) => {
      this.sendToOthers(this.game.master, 'removePlayer', userId)
    })

    this.game.on('entriesPerPlayerUpdated', () => {
      this.sendToOthers(this.game.master, 'setEntriesPerPlayer', this.game.entriesPerPlayer)
    })

    this.game.on('teamAdded', (team) => {
      this.sendToOthers(this.game.master, 'addTeam', team.data)
    })

    this.game.on('teamRemoved', (teamId) => {
      this.sendToOthers(this.game.master, 'removeTeam', teamId)
    })

    this.game.on('playerAddedToTeam', (user) => {
      this.sendToOthers(this.game.master, 'addPlayerToTeam', {userId: user.id, teamId: user.teamId})
    })

    this.game.on('playerReady', (user) => {
      this.sendToAll('setPlayerReady', user.id)
    })

    this.game.on('started', () => {
      this.sendToAll('startGame')
    })

    this.game.on('finished', () => {
      this.sendToAll('finishGame')
    })
  }

  static initialResponse(userId, game = null) {
    return {
      mutation: 'load',
      data: {
        userId,
        game: game ? game.dataForUser(userId) : null,
      },
    }
  }
}

module.exports = ResponseFactory
