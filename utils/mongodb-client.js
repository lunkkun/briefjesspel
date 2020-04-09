const {MongoClient} = require('mongodb')
const url = process.env.MONGODB_URL || 'mongodb://localhost:27017/briefjesspel'

const client = new MongoClient(url, {useNewUrlParser: true, useUnifiedTopology: true})

module.exports = client
