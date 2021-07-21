const winston = require('winston')

module.exports.buildDevLogger = () => {
    const logConfiguration = {
        'transports': [
            new winston.transports.Console()
        ],
        'format': winston.format.combine (
            winston.format.timestamp({
               format: 'MMM-DD-YYYY HH:mm:ss'
           }),
            winston.format.colorize({
                all:true
            }),
            winston.format.printf(info => `${info.timestamp}: ${[info.level]}: ${info.message}`),
        )
    };
    
    return winston.createLogger(logConfiguration);
}