const uuid = require('uuid')

class User {
  id
  name

  constructor(data = {}) {
    this.id = data.id || uuid.v4()
    this.name = data.name || ''
  }

  get data() {
    return {
      name: this.name,
    }
  }
}

module.exports = User
