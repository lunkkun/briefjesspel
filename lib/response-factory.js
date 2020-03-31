const EventEmitter = require('events').EventEmitter

class ResponseFactory extends EventEmitter {
  constructor(game) {
    super()
    this.game = game
    this.attachHandlers()
  }

  send(userId, type, payload = null) {
    this.emit('message', {userId, type, payload})
  }

  sendToAll(type, payload = null) {
    this.game.players.forEach((user) => {
      this.send(user.id, type, payload)
    })
  }

  sendToOthers(userId, type, payload = null) {
    this.game.players.forEach((user) => {
      if (user.id !== userId) {
        this.send(user.id, type, payload)
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
      this.sendToAll('addTeam', team.data)
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

    this.game.on('turnTimeUpdated', () => {
      this.sendToOthers(this.game.master, 'setTurnTime', this.game.turnTime)
    })

    this.game.on('started', () => {
      this.sendToAll('startGame')
    })

    this.game.on('roundStarted', () => {
      this.sendToAll('startRound', {
        activeTeam: this.game.activeTeam,
        activePlayer: this.game.activePlayer,
        nextTeam: this.game.nextTeam,
        nextPlayer: this.game.nextPlayer,
      })
    })

    this.game.on('roundFinished', () => {
      this.sendToAll('finishRound')
    })

    this.game.on('finished', () => {
      this.sendToAll('finishGame')
    })
  }

  static initialResponse(userId, game = null) {
    return {
      type: 'load',
      payload: {
        userId,
        game: game ? game.dataForUser(userId) : null,
      },
    }
  }
}

module.exports = ResponseFactory
