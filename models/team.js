const uuid = require('uuid')

class Team {
  constructor(data = {}) {
    this.id = data.id || uuid.v4()
    this.name = data.name || null
    this.score = data.score || 0
    this.scoreThisRound = data.scoreThisRound || 0
  }

  get data() {
    return {
      id: this.id,
      name: this.name,
      score: this.score,
      scoreThisRound: this.scoreThisRound,
    }
  }
}

module.exports = Team
