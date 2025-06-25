
const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logger = {
  info: (message, data = {}) => {
    const log = {
      level: 'INFO',
      message,
      data,
      timestamp: new Date().toISOString()
    };
    console.log(JSON.stringify(log));
  },
  
  error: (message, error = {}) => {
    const log = {
      level: 'ERROR',
      message,
      error: error.message || error,
      stack: error.stack,
      timestamp: new Date().toISOString()
    };
    console.error(JSON.stringify(log));
  },
  
  warn: (message, data = {}) => {
    const log = {
      level: 'WARN',
      message,
      data,
      timestamp: new Date().toISOString()
    };
    console.warn(JSON.stringify(log));
  }
};

module.exports = logger;
