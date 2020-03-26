const crypto = require('crypto')

class User {
  id = crypto.randomBytes(16).toString('hex')
  name = ''

  get data() {
    return {
      name: this.name,
    }
  }
}

module.exports = User
