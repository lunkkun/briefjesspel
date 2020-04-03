const uuid = require('uuid')
const EventEmitter = require('events').EventEmitter
const randomString = require('../lib/random-string')
const shuffle = require('../lib/shuffle')

class Game extends EventEmitter {
  constructor(data = {}) {
    super()

    // identifiers
    this.id = data.id || uuid.v4()
    this.path = data.path || randomString(10, true)

    // timestamps
    this.createdAt = data.createdAt || new Date()
    this.updatedAt = data.updatedAt || new Date()

    // settings for game
    this.master = data.master || null
    this.players = data.players || new Map()
    this.teams = data.teams || new Map()
    this.entriesPerPlayer = data.entriesPerPlayer || 0
    this.entries = data.entries || []
    this.turnOrder = data.turnOrder || []

    // state of game
    this.isStarted = data.isStarted || false
    this.isFinished = data.isFinished || false

    // settings for round
    this.turnTime = data.turnTime || 0 // in seconds
    this.scorePerEntry = data.scorePerEntry || 1

    // state of round
    this.entriesRemaining = data.entriesRemaining || []
    this.roundStarted = data.roundStarted || false
    this.roundFinished = data.roundFinished || false

    // state of turn
    this.turnStarted = data.turnStarted || false
    this.turnFinished = data.turnFinished || false
    this.turnTimeLeft = data.turnTimeLeft || 0 // in seconds
    this.scoreThisTurn = data.scoreThisTurn || 0
  }


  // getters

  get canStart() {
    return !this.isStarted &&
      Array.from(this.players.values()).every(user => user.isReady && user.teamId) &&
      Array.from(this.teams.values()).every(team => this._playersForTeam(team.id).length >= 2)
  }

  get canStartRound() {
    return this.isStarted && !this.roundStarted && this.turnTime && this.scorePerEntry
  }

  get canStartTurn() {
    return this.roundStarted && !this.turnStarted && this.entriesRemaining.length
  }

  get activeTeam() {
    return this.turnOrder.length ? this.turnOrder[0].teamId : null
  }

  get activePlayer() {
    return this.turnOrder.length ? this.turnOrder[0].players[0] : null
  }

  get nextTeam() {
    if (this.turnOrder.length > 1) {
      return this.turnOrder[1].teamId
    } else if (this.turnOrder.length) {
      // Special case for playing with only one team
      return this.turnOrder[0].teamId
    } else {
      return null
    }
  }

  get nextPlayer() {
    if (this.turnOrder.length > 1) {
      return this.turnOrder[1].players[0]
    } else if (this.turnOrder.length) {
      // Special case for playing with only one team
      return this.turnOrder[0].players[1]
    } else {
      return null
    }
  }

  get activeEntry() {
    // entriesRemaining functions like a stack
    return this.entriesRemaining[this.entriesRemaining.length - 1]
  }


  // public methods

  addPlayer(user) {
    if (!this.players.has(user.id)) {
      this.players.set(user.id, user)

      this.emit('playerAdded', user)
    }
  }

  setPlayerName(userId, name) {
    if (this.players.has(userId)) {
      const user = this.players.get(userId)
      user.name = name

      this.emit('playerNameSet', user)

      this._checkPlayerReady(user)
    }
  }

  setFont(userId, font) {
    if (this.players.has(userId)) {
      const user = this.players.get(userId)
      user.font = font

      this.emit('playerFontSet', user)
    }
  }

  removePlayer(userId, byHimself = false) {
    if (this.players.has(userId) && this.activePlayer !== userId) {
      this.players.delete(userId)

      this.turnOrder.forEach((team) => {
        team.players = team.players.filter(id => id !== userId)
      })

      if (userId === this.master && this.players.size) {
        this.master = this.players.values().next().value.id
        this.emit('masterUpdated')
      }

      this.emit(byHimself ? 'playerLeft' : 'playerRemoved', userId)
    }
  }

  setEntriesPerPlayer(entriesPerPlayer) {
    this.entriesPerPlayer = entriesPerPlayer

    this.emit('entriesPerPlayerUpdated')
  }

  addEntry(userId, entry) {
    if (this.players.has(userId)) {
      const user = this.players.get(userId)
      user.entries.push(entry)

      this._checkPlayerReady(user)
    }
  }

  addTeam(team) {
    this.teams.set(team.id, team)

    this.emit('teamAdded', team)
  }

  addPlayerToTeam(userId, teamId) {
    if (this.players.has(userId) && this.teams.has(teamId)) {
      const user = this.players.get(userId)
      user.teamId = teamId

      this.emit('playerAddedToTeam', user)
    }
  }

  removePlayerFromTeam(userId, teamId) {
    if (this.players.has(userId)) {
      const user = this.players.get(userId)
      if (user.teamId === teamId) {
        user.teamId = null

        this.emit('playerRemovedFromTeam', {userId, teamId})
      }
    }
  }

  removeTeam(teamId) {
    if (this.teams.has(teamId) && this.activeTeam !== teamId) {
      this.teams.delete(teamId)

      this.turnOrder = this.turnOrder.filter(team => team.teamId !== teamId)

      this._playersForTeam(teamId).forEach((user) => {
        user.teamId = null
      })

      this.emit('teamRemoved', teamId)
    }
  }

  setTurnTime(turnTime) {
    this.turnTime = turnTime

    this.emit('turnTimeUpdated')
  }

  start() {
    if (this.canStart) {
      this._fillEntries()
      this._randomizeTurnOrder()

      this.isStarted = true

      this.emit('started')

      this.startRound()
    }
  }

  startRound() {
    if (this.canStartRound) {
      this._randomizeEntries()

      this.turnTimeLeft = this.turnTime
      this.roundStarted = true

      this.emit('roundStarted')
    }
  }

  startTurn() {
    if (this.canStartTurn) {
      this._startTimer()

      this.turnStarted = true

      this.emit('turnStarted')

      this._checkNextEntry()
    }
  }

  nextEntry() {
    this._score()
    this.entriesRemaining.pop()

    this._checkNextEntry()
  }

  finishTurn() {
    this.turnFinished = true

    this.emit('turnFinished')

    // Bury the active entry into the pile
    shuffle(this.entriesRemaining, true)
  }

  nextTurn() {
    this._shiftTurn()

    this.turnStarted = false
    this.turnFinished = false
    this.turnTimeLeft = this.turnTime
    this.scoreThisTurn = 0

    this.emit('nextTurn')
  }

  finishRound() {
    clearInterval(this.timer)
    this.roundFinished = true

    this.emit('roundFinished')
  }

  nextRound() {
    this.roundStarted = false
    this.roundFinished = false

    this.turnStarted = false
    this.scoreThisTurn = 0

    this.teams.forEach((team) => {
      team.scoreThisRound = 0
    })

    this._shiftTurn()

    this.emit('nextRound')
  }

  finish() {
    this.isFinished = true

    this.emit('finished')
  }


  // private methods

  _playerIsReady(user) {
    return user.name && this.entriesPerPlayer && user.entries.length === this.entriesPerPlayer
  }

  _checkPlayerReady(user) {
    if (!user.isReady && this._playerIsReady(user)) {
      user.isReady = true
      this.emit('playerReady', user)
    }
  }

  _fillEntries() {
    // put all of the player's entries into the game
    // this prevents losing entries if a player leaves the game
    this.players.forEach((user) => {
      this.entries.push(...user.entries)
    })
  }

  _playersForTeam(teamId) {
    return Array.from(this.players.values())
      .filter(user => user.teamId === teamId)
  }

  _randomizeTurnOrder() {
    this.turnOrder = []

    this.teams.forEach((team) => {
      this.turnOrder.push({
        teamId: team.id,
        players: shuffle(this._playersForTeam(team.id).map(user => user.id))
      })
    })

    shuffle(this.turnOrder)
  }

  _randomizeEntries() {
    this.entriesRemaining = [...this.entries]
    shuffle(this.entriesRemaining)
  }

  _startTimer() {
    this.timer = setInterval(() => {
      this.turnTimeLeft--

      if (this.turnTimeLeft <= 0) {
        clearInterval(this.timer)

        this.finishTurn()
      }
    }, 1000)
  }

  _checkNextEntry() {
    if (this.entriesRemaining.length) {
      this.emit('nextEntry')
    } else {
      this.finishRound()
    }
  }

  _score() {
    this.scoreThisTurn += this.scorePerEntry

    const team = this.teams.get(this.activeTeam)
    if (team) {
      team.score += this.scorePerEntry
      team.scoreThisRound += this.scorePerEntry

      this.emit('teamScored', team)
    }
  }

  _shiftTurn() {
    const team = this.turnOrder.shift()
    team.players.push(team.players.shift())
    this.turnOrder.push(team)
  }


  // data getters

  get playerData() {
    return Array.from(this.players.values())
      .map(user => user.data)
  }

  get teamData() {
    return Array.from(this.teams.values())
      .map(team => team.data)
  }

  get data() {
    return {
      path: this.path,

      players: this.playerData,
      teams: this.teamData,
      master: this.master,
      entriesPerPlayer: this.entriesPerPlayer,

      isStarted: this.isStarted,
      isFinished: this.isFinished,

      turnTime: this.turnTime,
      scorePerEntry: this.scorePerEntry,
      roundStarted: this.roundStarted,
      roundFinished: this.roundFinished,

      activeTeam: this.activeTeam,
      activePlayer: this.activePlayer,
      turnStarted: this.turnStarted,
      turnFinished: this.turnFinished,
      turnTimeLeft: this.turnTimeLeft,
      scoreThisTurn: this.scoreThisTurn,
      nextTeam: this.nextTeam,
      nextPlayer: this.nextPlayer,
    }
  }

  dataForUser(userId) {
    const gameData = this.data

    if (this.players.has(userId)) {
      const user = this.players.get(userId)
      gameData.font = user.font
      gameData.entries = user.entries
      if (this.activePlayer === userId) {
        gameData.activeEntry = this.activeEntry
      }
    }

    return gameData
  }


  // event handling

  emit(event, args) {
    // always save when emitting
    this.save()

    return super.emit(event, args)
  }

  save() {
    this.updatedAt = new Date()

    // TODO
  }
}

module.exports = Game
