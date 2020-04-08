const {MongoClient} = require('mongodb')

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017'
const dbName = process.env.MONGODB_NAME || 'briefjesspel'

let client = MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true})

module.exports = {
  connect() {
    return client.connect()
  },

  get db() {
    return client.db(dbName)
  },
}
