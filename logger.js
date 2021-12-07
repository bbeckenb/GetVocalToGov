 
const { createLogger, format, transports, config } = require('winston');
const { combine, timestamp, json } = format;
 
const UserModelLogger = createLogger({
    format: combine(
        timestamp({
            format: 'YYY-MM-DD HH:mm:ss'
        }),
        json()
    ),
    
    transports: [
       new transports.Console(),
       new transports.File({ filename: 'combinedErrors.log' })
     ]
 });
 module.exports = {
     UserModelLogger: UserModelLogger,
 };