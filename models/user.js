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
    this.name = data.name || null
    this.font = data.font || null
    this.teamId = data.teamId || null
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
