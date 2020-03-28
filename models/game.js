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

  // state of game
  isStarted = false
  isFinished = false

  // settings for round
  turnTime // in seconds
  scorePerEntry

  // state of round
  entriesForRound = []
  turnOrder = []
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

  hasPlayer(userId) {
    return this.players.has(userId)
  }

  isMaster(userId) {
    return this.master === userId
  }

  teamForUser(userId) {
    for (const team in this.teams.values()) {
      if (team.players.includes(userId)) {
        return team
      }
    }
  }

  addPlayer(userId, isMaster = false) {
    if (!this.isStarted && !this.hasPlayer(userId)) {
      const user = new User({id: userId})
      this.players.set(userId, user)

      if (isMaster) {
        this.master = userId
      }

      this.emit('playerAdded', user)
    }
  }

  removePlayer(userId) {
    if (this.players.has(userId)) {
      this.players.delete(userId)

      this.emit('playerRemoved')
    }
  }

  setPlayerName(userId, name) {
    if (this.players.has(userId)) {
      const user = this.players.get(userId)
      const nameSet = !!user.name
      user.name = name

      this.emit(nameSet ? 'playerNameUpdated': 'playerNameSet', user)
    }
  }

  setEntriesPerPlayer(entriesPerPlayer) {
    this.entriesPerPlayer = entriesPerPlayer

    this.emit('entriesPerPlayerUpdated')
  }

  addTeam(team) {
    this.teams.set(team.id, team)
    this.turnOrder.push(team.id)

    this.emit('addedTeam', team)
  }

  get canStart() {
    // TODO: check if all players have entered all entries
    // TODO: check if all players are in a team
    return !this.isStarted
  }

  start() {
    if (this.canStart) {
      this.isStarted = true

      this.emit('started')
    }
  }

  finish() {
    if (!this.isFinished) {
      this.isFinished = true

      this.emit('finished')
    }
  }

  get playerData() {
    return Array.from(this.players.values())
      .map(user => user.data)
      .filter(user => user.name)
  }

  get teamData() {
    return this.turnOrder.map((teamId) => {
      const data = this.teams.get(teamId).data
      data.players = data.players
        .map(userId => this.players.get(userId).data)
      return data
    })
  }

  get data() {
    return {
      path: this.path,
      master: this.master,

      players: this.playerData,
      teams: this.teamData,
      entriesPerPlayer: this.entriesPerPlayer,

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
    gameData.playerName = this.players.get(userId).name

    const team = this.teamForUser(userId)
    if (team) {
      gameData.teamId = team.id
      gameData.teamName = team.name
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
