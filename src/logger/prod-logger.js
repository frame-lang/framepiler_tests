const winston = require('winston')


const getLogPath = () => {
    // const date = new Date()
    // const formattedDate = ("0" + date.getDate()).slice(-2) + "-" + ("0"+(date.getMonth()+1)).slice(-2) + "-" +
    // date.getFullYear() + "_" + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2)

    return `logs/Frame_Test_Report_${Date.now()}.txt`
}

let logPath = getLogPath()

const buildProdLogger = () => {
    console.log(`Log file path: ${logPath}`);
    
    const logConfiguration = {
        'transports': [
            new winston.transports.Console(),
            new winston.transports.File({
                filename: logPath
            })
        ],
        'format': winston.format.combine (
            winston.format.timestamp({
               format: 'MMM-DD-YYYY HH:mm:ss'
           }),
            winston.format.printf(info => `${info.timestamp}: ${[info.level]}: ${info.message}`),
        )
    }
    
    return winston.createLogger(logConfiguration)
}

module.exports = {
    logPath,
    buildProdLogger 
}