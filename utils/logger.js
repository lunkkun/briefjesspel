const logLevel = process.env.LOG_LEVEL || 'info'

const SimpleNodeLogger = require('simple-node-logger')

const logger = SimpleNodeLogger.createSimpleLogger({
  timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
})

logger.setLevel(logLevel)

module.exports = logger
