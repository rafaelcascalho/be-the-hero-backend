const winston = require('winston');
const expressWinston = require('express-winston');

const transportsOptions = [
  new winston.transports.Console(),
  new winston.transports.File({
    filename: './logs/errors.log',
    level: 'error',
  }),
  new winston.transports.File({ filename: './logs/requests.log' }),
];

module.exports = {
  requestLogger: expressWinston.logger({
    transports: transportsOptions,
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
    meta: true,
    msg: 'HTTP {{req.method}} {{req.url}}',
    expressFormat: true,
    colorize: true,
  }),

  errorLogger: expressWinston.errorLogger({
    transports: transportsOptions,
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple(),
      winston.format.errors({ stack: true })
    ),
  }),
};
