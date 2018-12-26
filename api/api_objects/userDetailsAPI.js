const restClient = new (require('../restClient').RestClient)()
const {opts} = require('../api_data/userDetailsData')
class UserDetailsAPI {

  constructor(options){
    this.options = options
  }

  async getUserData(id){
    opts.url = opts.url + id;
    return restClient.GET(opts)
  }
}

module.exports = {UserDetailsAPI}