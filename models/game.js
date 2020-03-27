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

  // state of round
  entriesForRound = []
  turnOrder = []
  turnTime // in seconds
  roundStarted = false

  // state of turn
  activePlayer
  turnStarted = false
  turnTimeLeft // in seconds

  constructor(data = {}) {
    super()
    this.id = data.id || uuid.v4()
    this.path = data.path || randomString(10)
    this.entriesPerPlayer = data.entriesPerPlayer || 4
  }

  hasPlayer(userId) {
    return this.players.has(userId)
  }

  addPlayer(userId, isMaster = false) {
    if (!this.isStarted && !this.hasPlayer(userId)) {
      this.players.set(userId, new User({id: userId}))

      if (isMaster) {
        this.master = userId
      }

      // Won't be used; setPlayerName will trigger addPlayer message
      // this.emit('playerAdded', user)
      this.save()
    }
  }

  removePlayer(userId) {
    this.players.delete(userId)

    this.emit('playerRemoved')
  }

  setPlayerName(userId, name) {
    if (this.players.has(userId)) {
      const user = this.players.get(userId)
      user.name = name

      // Triggers addPlayer message
      this.emit('playerNameSet', user)
    }
  }

  addTeam(team) {
    this.teams.set(team.id, team)
    this.turnOrder.push(team.id)

    this.emit('addedTeam', team)
  }

  start() {
    if (!this.isStarted) {
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
      .map((user) => {
        const data = user.data
        data.isMaster = user.id === this.master
        return data
      })
      .filter(user => user.name)
  }

  get teamData() {
    return this.turnOrder.map((teamId) => {
      const data = this.teams.get(teamId).data
      data.players = data.players
        .map(userId => this.players.get(userId).data)
        .filter(user => user.name)
      return data
    })
  }

  get data() {
    return {
      path: this.path,

      players: this.playerData,
      teams: this.teamData,
      entriesPerPlayer: this.entriesPerPlayer,

      isStarted: this.isStarted,
      isFinished: this.isFinished,

      turnTime: this.turnTime,
      roundStarted: this.roundStarted,

      activePlayer: this.activePlayer,
      turnStarted: this.turnStarted,
      turnTimeLeft: this.turnTimeLeft,
    }
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
