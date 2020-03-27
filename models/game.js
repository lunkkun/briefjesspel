const uuid = require('uuid')
const EventEmitter = require('events').EventEmitter
const User = require('../models/user')
const randomString = require('../lib/random-string')

class Game extends EventEmitter {
  id
  path
  players = new Map()
  teams = new Map()

  master
  notesPerPlayer

  isActive = true
  isStarted = false
  isFinished = false

  turnOrder = []
  turnTime // in seconds
  activePlayer
  turnStarted = false
  turnTimeLeft // in seconds

  createdAt = new Date()
  updatedAt = new Date()

  constructor(data = {}) {
    super()
    this.id = data.id || uuid.v4()
    this.path = data.path || randomString(10)
    this.notesPerPlayer = data.notesPerPlayer || 4
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
    const players = this.players.map((user) => {
      const data = user.data
      data.isMaster = user.id === this.master
      return data
    })
  }

  get data() {
    return {
      path: this.path,
      players: this.playerData.filter(user => user.name),
      teams: this.turnOrder.map(teamId => this.teams.get(teamId).data),
      isStarted: this.isStarted,
      isFinished: this.isFinished,
      turnTime: this.turnTime,
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
