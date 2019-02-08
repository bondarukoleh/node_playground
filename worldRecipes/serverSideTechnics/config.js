const serverConfigToRun = {
  dev: require('../envConfigs/dev.json'),
  qa: require('../envConfigs/qa.json')
}

// easy way to get config.
module.exports = serverConfigToRun[process.env.NODE_ENV === 'development' || 'qa'];