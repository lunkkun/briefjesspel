const uuid = require('uuid')

class User {
  id
  name
  font

  constructor(data = {}) {
    this.id = data.id || uuid.v4()
    this.name = data.name || ''
  }

  get data() {
    return {
      id: this.id,
      name: this.name,
      font: this.font,
    }
  }
}

module.exports = User
