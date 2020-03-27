const uuid = require('uuid')

class Team {
  id
  name
  score
  players = new Map()
  turnOrder = []

  constructor(data = {}) {
    this.id = data.id || uuid.v4()
    this.name = data.name || ''
    this.score = data.score || 0
  }

  addPlayer(user) {
    this.players.set(user.id, user)
    this.turnOrder.push(user.id)
  }

  get data() {
    return {
      name: this.name,
      score: this.score,
      players: this.turnOrder.map(userId => this.players.get(userId).data),
    }
  }
}

module.exports = Team
