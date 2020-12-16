const uuid = require('uuid')
const {EventEmitter} = require('events')
const randomString = require('../utils/random-string')
const shuffle = require('../utils/shuffle')
const User = require('./user')
const Team = require('./team')

const minTeams = 1 // process.env.NODE_ENV === 'production' ? 2 : 1
const minPlayersPerTeam = process.env.NODE_ENV === 'production' ? 2 : 1

class Game extends EventEmitter {
  constructor(data = {}) {
    super()

    // identifiers
    this.id = data.id || uuid.v4()
    this._id = data._id // MongoDB's identifier
    this.path = data.path || randomString(10, true)

    // timestamps
    this.createdAt = data.createdAt || new Date()
    this.updatedAt = data.updatedAt || new Date()

    // settings for game
    this.players = new Map(Object.entries(data.players || {})
      .map(([key, value]) => [key, new User(value)]))
    this.teams = new Map(Object.entries(data.teams || {})
      .map(([key, value]) => [key, new Team(value)]))
    this.master = data.master || null
    this.entriesPerPlayer = data.entriesPerPlayer || 0
    this.container = data.container || null
    this.entries = data.entries || []
    this.turnOrder = data.turnOrder || []

    // state of game
    this.isStarted = data.isStarted || false
    this.isFinished = data.isFinished || false
    this.isArchived = data.isArchived || false

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

    this.redirectPath = data.redirectPath || null
  }


  // getters

  get allPlayersAssignedAndReady() {
    return Array.from(this.players.values())
      .filter(user => user.name)
      .every(user => user.isReady && user.teamId)
  }

  get enoughTeams() {
    return this.teams.size >= minTeams
  }

  get allTeamsHaveEnoughPlayers() {
    return Array.from(this.teams.values())
      .every(team => this._playersForTeam(team.id).length >= minPlayersPerTeam)
  }

  get canStart() {
    return !this.isStarted &&
      this.allPlayersAssignedAndReady &&
      this.enoughTeams &&
      this.allTeamsHaveEnoughPlayers
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
      if (this.turnOrder[0].players.length > 1) {
        return this.turnOrder[0].players[1]
      } else {
        // Special case for playing with only one player
        return this.turnOrder[0].players[0]
      }
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

  removePlayer(userId) {
    if (this.players.has(userId)) {
      this.players.delete(userId)

      if (this.activePlayer === userId) {
        this.nextTurn()
      }

      const wasNextPlayer = this.nextPlayer === userId

      this.turnOrder.forEach((team) => {
        team.players = team.players.filter(id => id !== userId)
      })

      this.emit('playerRemoved', userId)

      if (wasNextPlayer) {
        this.emit('nextPlayerUpdated')
      }

      if (userId === this.master && this.players.size && !this.isFinished) {
        this.master = this.players.values().next().value.id
        this.emit('masterUpdated')
      }
    }
  }

  setEntriesPerPlayer(entriesPerPlayer) {
    this.entriesPerPlayer = entriesPerPlayer

    this.emit('entriesPerPlayerUpdated')
  }

  setContainer(container) {
    this.container = container

    this.emit('containerSet')
  }

  addEntry(userId, index, entry) {
    if (this.players.has(userId)) {
      const user = this.players.get(userId)
      user.entries[index] = entry

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

    if (this.turnTimeLeft > turnTime) {
      this.turnTimeLeft = turnTime
    }

    this.emit('turnTimeUpdated')
  }

  start() {
    if (this.canStart) {
      // kick out ghost players when starting the game
      this.players.forEach(user => {
        if (!user.name) {
          this.removePlayer(user)
        }
      })

      this._collectEntries()
      this._randomizeTurnOrder()

      this.turnTimeLeft = this.turnTime
      this.isStarted = true

      this.emit('started')

      this.startRound()
    }
  }

  startRound() {
    if (this.canStartRound) {
      this._randomizeEntries()

      this.roundStarted = true

      this.emit('roundStarted')
    }
  }

  startTurn() {
    if (this.canStartTurn) {
      this.startTimer()

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
    clearInterval(this._timer)
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

    this.turnTimeLeft = this.turnTime
    this._shiftTurn()
    // Don't finish the turn next round

    this.emit('nextRound')
  }

  finish() {
    this.isFinished = true

    this.emit('finished')
  }

  redirect(game) {
    this.redirectPath = game.path

    this.emit('redirected')
  }

  archive() {
    this.isArchived = true

    this.emit('archived')
  }

  startTimer() {
    const interval = setInterval(() => {
      this.turnTimeLeft--

      if (this.turnTimeLeft <= 0) {
        clearInterval(interval)

        this.finishTurn()
      }
    }, 1000)

    this._timer = interval
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

  /**
   * Put all of the player's entries into the game.
   * This prevents losing entries if a player leaves the game.
   * Also, set the font based on the user.
   */
  _collectEntries() {
    this.players.forEach((user) => {
      this.entries.push(...user.entries.map(text => ({text, font: user.font})))
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
      container: this.container,

      isStarted: this.isStarted,
      isFinished: this.isFinished,

      turnTime: this.turnTime,
      scorePerEntry: this.scorePerEntry,
      roundStarted: this.roundStarted,
      roundFinished: this.roundFinished,

      activeTeam: this.activeTeam,
      activePlayer: this.activePlayer,
      entriesRemaining: this.entriesRemaining.length,
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
      if (this.activePlayer === userId && this.turnStarted) {
        gameData.activeEntry = this.activeEntry
      }
    }

    return gameData
  }


  // event handling

  emit(event, ...args) {
    // always save when emitting
    this.updatedAt = new Date()
    super.emit('changed')

    return super.emit(event, ...args)
  }
}

module.exports = Game
