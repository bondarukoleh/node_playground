const rp = require('request-promise')
const {baseUrl} = require('./api_data/commonData')

class RestClient {

  async GET(options){
    const toSend = this.prepareOptions(options)
    return this.sendRequest(toSend, 'GET')
  }

  prepareOptions(options){
    const optionsToSend = {}
    if(!options.header){
      optionsToSend.header = options.header
    }
    if(options.url){
      optionsToSend.url = `${baseUrl}${options.url}` 
    }
    return optionsToSend
  }

  async sendRequest(data, method){
    data.method = method;
    try {
      const resp = await rp(data)
      try {
        return JSON.parse(resp)
      } catch (error) {
        console.log('RESPONSE IS NOT JSON');
        return resp
      }
    } catch(e){
      console.log('EROOOOOOOOOR');
      console.log(e)
    }
  }
}

module.exports = {RestClient}
