const { buildDevLogger } = require('./dev-logger.js')
const { logPath, buildProdLogger } = require('./prod-logger.js')

const env = process.env.NODE_ENV

const logger = env === 'production'
               ? buildProdLogger()
               : buildDevLogger()

module.exports = {
    logPath,
    logger
}