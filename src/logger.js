const path    = require('path');
const winston = require('winston');
const _       = require('lodash');


function createLogger(filePath) {
  const fileName = path.basename(filePath);
  const label = fileName || '';

  const logger = new winston.Logger({
    transports: [new winston.transports.Console({
      label,
      timestamp: true
    })]
  });

  _setLevelForTransports(logger, process.env.LOG_LEVEL || 'debug');
  return logger;
}

function _setLevelForTransports(logger, level) {
  _.each(logger.transports, transport => {
    transport.level = level;

    if (level === 'debug') {
      transport.prettyPrint = object => JSON.stringify(object, false, 2);
      transport.colorize = true;
    }
  });
}

module.exports = createLogger;
