const {MongoClient} = require('mongodb')

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/briefjesspel'

const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true})

module.exports = client
