import buildDevLogger from './dev-logger.js'
import { logPath, buildProdLogger } from './prod-logger.js'

const env = process.env.NODE_ENV

const logger = env === 'production'
               ? buildProdLogger()
               : buildDevLogger()

export {
    logPath,
    logger
}