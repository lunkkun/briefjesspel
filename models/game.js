const uuid = require('uuid')
const EventEmitter = require('events').EventEmitter
const User = require('../models/user')
const randomString = require('../lib/random-string')

class Game extends EventEmitter {
  // identifiers
  id
  path

  // timestamps
  createdAt = new Date()
  updatedAt = new Date()

  // settings for game
  players = new Map()
  teams = new Map()
  master
  entriesPerPlayer
  entries = []
  turnOrder = []

  // state of game
  isStarted = false
  isFinished = false

  // settings for round
  turnTime // in seconds
  scorePerEntry

  // state of round
  entriesRemaining = []
  roundStarted = false

  // state of turn
  activeTeam
  activePlayer
  turnStarted = false
  turnTimeLeft // in seconds

  constructor(data = {}) {
    super()
    this.id = data.id || uuid.v4()
    this.path = data.path || randomString(10, true)
  }

  addPlayer(user, isMaster = false) {
    if (!this.players.has(user.id)) {
      this.players.set(user.id, user)

      if (isMaster) {
        this.master = user.id
      }

      this.emit('playerAdded', user)
    }
  }

  setPlayerName(userId, name) {
    if (this.players.has(userId)) {
      const user = this.players.get(userId)
      user.name = name

      this.emit('playerNameSet', user)

      this.checkPlayerReady(user)
    }
  }

  removePlayer(userId) {
    if (this.players.has(userId)) {
      this.players.delete(userId)

      this.turnOrder.forEach((team) => {
        team.players = team.players.filter(id => id !== userId)
      })

      this.emit('playerRemoved', userId)
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

      this.checkPlayerReady(user)
    }
  }

  addTeam(team) {
    this.teams.set(team.id, team)

    this.emit('teamAdded', team)
  }

  removeTeam(teamId) {
    if (this.teams.has(teamId)) {
      this.teams.delete(teamId)

      this.turnOrder = this.turnOrder.filter(id => id !== teamId)

      this.emit('teamRemoved', teamId)
    }
  }

  addPlayerToTeam(userId, teamId) {
    if (this.players.has(userId) && this.teams.has(teamId)) {
      const user = this.players.get(userId)
      user.teamId = teamId

      this.emit('playerAddedToTeam', user)
    }
  }

  get canStart() {
    return Array.from(this.players.values())
      .every((user) => user.isReady && user.teamId)
  }

  start() {
    if (!this.isStarted && this.canStart) {
      // TODO

      this.isStarted = true

      this.emit('started')
    }
  }

  finish() {
    this.isFinished = true

    this.emit('finished')
  }

  playerIsReady(user) {
    return user.name && this.entriesPerPlayer && user.entries.size === this.entriesPerPlayer
  }

  checkPlayerReady(user) {
    if (!user.isReady) {
      if (this.playerIsReady(user)) {
        user.isReady = true
        this.emit('playerReady', user)
      }
    }
  }

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
      master: this.master,

      players: this.playerData,
      teams: this.teamData,
      entriesPerPlayer: this.entriesPerPlayer,
      turnOrder: this.turnOrder,

      canStart: this.canStart,
      isStarted: this.isStarted,
      isFinished: this.isFinished,

      turnTime: this.turnTime,
      scorePerEntry: this.scorePerEntry,
      roundStarted: this.roundStarted,

      activeTeam: this.activeTeam,
      activePlayer: this.activePlayer,
      turnStarted: this.turnStarted,
      turnTimeLeft: this.turnTimeLeft,
    }
  }

  dataForUser(userId) {
    const gameData = this.data

    if (this.players.has(userId)) {
      const user = this.players.get(userId)
      gameData.font = user.font
      gameData.entries = user.entries
    }

    return gameData
  }

  // always save when emitting
  emit(event, args) {
    this.save()

    return super.emit(event, args)
  }

  save() {
    this.updatedAt = new Date()

    // TODO
  }
}

module.exports = Game
