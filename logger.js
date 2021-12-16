const {
  createLogger, format, transports,
} = require('winston');

const { combine, timestamp, json } = format;

const UserModelLogger = createLogger({
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    json(),
  ),

  transports: [
    new transports.Console(),
    new transports.File({ filename: 'combinedErrors.log' }),
  ],
});

const PostModelLogger = createLogger({
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    json(),
  ),

  transports: [
    new transports.Console(),
    new transports.File({ filename: 'combinedErrors.log' }),
  ],
});

const TemplateModelLogger = createLogger({
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    json(),
  ),

  transports: [
    new transports.Console(),
    new transports.File({ filename: 'combinedErrors.log' }),
  ],
});

module.exports = {
  UserModelLogger,
  PostModelLogger,
  TemplateModelLogger,
};
