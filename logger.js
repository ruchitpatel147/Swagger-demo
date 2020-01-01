'use strict';

let loggerFile;

class logger {

  static setup(winston) {
    loggerFile = winston.createLogger({
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'info.log', level: 'info' }),
        new winston.transports.File({ filename: 'error.log', level: 'error' })
      ]
    });
  };

  static getContext() {
    return loggerFile;
  }
}

module.exports = logger;