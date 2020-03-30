const uuid = require('uuid')

class User {
  id
  name
  font
  teamId
  entries
  isReady

  constructor(data = {}) {
    this.id = data.id || uuid.v4()
    this.name = data.name
    this.font = data.font
    this.teamId = data.teamId
    this.entries = data.entries || []
    this.isReady = data.isReady || false
  }

  get data() {
    return {
      id: this.id,
      name: this.name,
      teamId: this.teamId,
      isReady: this.isReady,
    }
  }
}

module.exports = User
