const uuid = require('uuid')

class Team {
  id
  name
  score
  players = []

  constructor(data = {}) {
    this.id = data.id || uuid.v4()
    this.name = data.name || ''
    this.score = data.score || 0
  }

  addPlayer(userId) {
    this.players.push(userId)
  }

  get data() {
    return {
      id: this.id,
      name: this.name,
      score: this.score,
      players: this.players,
    }
  }
}

module.exports = Team
