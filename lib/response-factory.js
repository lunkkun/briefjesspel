const {EventEmitter} = require('events')

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
    this.game.on('loaded', () => {
      this.send(this.game.master, 'load',
        this.constructor.forLoad(this.game.master, this.game)
      )
    })

    this.game.on('redirected', () => {
      this.sendToOthers(this.game.master, 'redirectToGame', this.game.redirectPath)
    })

    this.game.on('playerAdded', (user) => {
      this.sendToOthers(user.id, 'addPlayer', user.data)
    })

    this.game.on('playerNameSet', (user) => {
      this.sendToOthers(user.id, 'setPlayerName', {
        id: user.id,
        name: user.name
      })
    })

    this.game.on('playerRemoved', (userId) => {
      this.send(userId, 'leaveGame')
      this.sendToAll('removePlayer', userId)
    })

    this.game.on('nextPlayerUpdated', () => {
      this.sendToAll('updateNextPlayer', {
        nextTeam: this.game.nextTeam,
        nextPlayer: this.game.nextPlayer,
      })
    })

    this.game.on('masterUpdated', () => {
      this.sendToAll('updateMaster', this.game.master)
    })

    this.game.on('entriesPerPlayerUpdated', () => {
      this.sendToOthers(this.game.master, 'setEntriesPerPlayer', this.game.entriesPerPlayer)
    })

    this.game.on('containerSet', () => {
      this.sendToOthers(this.game.master, 'setContainer', this.game.container)
    })

    this.game.on('playerReady', (user) => {
      this.sendToAll('setPlayerReady', user.id)
    })

    this.game.on('teamAdded', (team) => {
      this.sendToAll('addTeam', team.data)
    })

    this.game.on('playerAddedToTeam', (user) => {
      this.sendToOthers(this.game.master, 'addPlayerToTeam', {
        id: user.id,
        teamId: user.teamId
      })
    })

    this.game.on('playerRemovedFromTeam', ({userId, teamId}) => {
      this.sendToOthers(this.game.master, 'removePlayerFromTeam', {
        id: userId,
        teamId: teamId,
      })
    })

    this.game.on('teamRemoved', (teamId) => {
      this.sendToOthers(this.game.master, 'removeTeam', teamId)
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
        entriesRemaining: this.game.entriesRemaining.length,
        turnTimeLeft: this.game.turnTimeLeft,
      })
    })

    this.game.on('turnStarted', () => {
      this.sendToAll('startTurn')
    })

    this.game.on('nextEntry', () => {
      this.send(this.game.activePlayer, 'nextEntry', {
        ...this.game.activeEntry,
        remaining: this.game.entriesRemaining.length,
      })
    })

    this.game.on('teamScored', (team) => {
      this.sendToAll('updateTeamScore', {
        id: team.id,
        score: team.score,
        scoreThisRound: team.scoreThisRound,
        scoreThisTurn: this.game.scoreThisTurn,
      })
    })

    this.game.on('turnFinished', () => {
      this.sendToAll('finishTurn')
    })

    this.game.on('nextTurn', () => {
      this.sendToAll('nextTurn', {
        activeTeam: this.game.activeTeam,
        activePlayer: this.game.activePlayer,
        nextTeam: this.game.nextTeam,
        nextPlayer: this.game.nextPlayer,
        entriesRemaining: this.game.entriesRemaining.length,
      })
    })

    this.game.on('roundFinished', () => {
      this.sendToAll('finishRound')
    })

    this.game.on('nextRound', () => {
      this.sendToAll('nextRound')
    })

    this.game.on('finished', () => {
      // for redundancy: send all scores
      this.sendToAll('finishGame', Array.from(this.game.teams.values())
        .map(({id, score}) => ({id, score})))
    })
  }

  static forLoad(userId, game) {
    return {
      userId,
      game: game ? game.dataForUser(userId) : undefined,
    }
  }
}

module.exports = ResponseFactory
