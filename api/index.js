const {UserDetailsAPI} = require('./api_objects/userDetailsAPI')
const api = {
  userDetails: new UserDetailsAPI()
}

module.exports = {api}