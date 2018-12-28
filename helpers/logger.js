const log = require('log4js');

function getLogger(name = 'Logger', level = 'info') {
    const createdLogger = log.getLogger(name);
    createdLogger.level = level;
    return createdLogger
}

module.exports = getLogger;
