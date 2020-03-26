const crypto = require('crypto')

class Team {
  id = crypto.randomBytes(16).toString('hex')
  name = ''
  score = 0
  users = new Map()

  get data() {
    return {
      name: this.name,
      score: this.score
    }
  }
}

module.exports = User
