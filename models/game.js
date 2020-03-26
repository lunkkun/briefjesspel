const EventEmitter = require('events').EventEmitter
const randomString = require('../lib/random-string')

class Game extends EventEmitter {
  id = crypto.randomBytes(16).toString('hex')
  uri = randomString(10)
  users = new Map()
  teams = new Map()

  get data() {
    return {
      uri: this.uri,
      users: this.users.map(user => user.data),
      teams: this.teams.map(team => team.data),
    }
  }

  addUser(user) {
    this.users.set(user.id, user)

    this.emit('addedUser', user.data)
  }

  addTeam(team) {
    this.teams.set(team.id, team)

    this.emit('addedTeam', team.data)
  }

  save() {
    // TODO
  }

  static load(data) {
    // TODO
  }
}

module.exports = Game
