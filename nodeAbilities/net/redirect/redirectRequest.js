const http = require('http');
const url = require('url');

class HandleRedirection {
  constructor(maxRedirects = 10){
    this.maxRedirects = maxRedirects
    this.redirectsCount = 0;
  }

  isRedirected(status) {
    return status >= 300 && status < 400
  }

  checkMaxredirectCount() {
    const violated = this.redirectsCount > this.maxRedirects
    if(!violated) {
      return true;
    } else {
      this.error = new Error('Too many redirections');
    }
  }

  get(link, callback){
    const uri = url.parse(link);
    const options = {host: uri.host, path: uri.path};
    console.log('Getting link:', link);
    const processResponse = (response) => {
      console.log('In processResponse');
      console.log(response.statusCode);
      if(this.isRedirected(response.statusCode) && this.checkMaxredirectCount()){
        this.redirectsCount++;
        const preparedLink = url.resolve(options.host, response.headers.location);
        console.log('Is redirected to:', response.headers.location);
        return this.get(preparedLink, callback)
      }
      const end = () => {
        console.log('Connection ended');
        callback(this.error, response)
      }

      response.on('error', _ => {
        this.error = new Error('Something goes wrong with request');
      })

      response.on('data', data => {
        console.log('Got data: %s', data);
        response.data = data;
      })

      response.on('end', end);
    }
    http.get(link, processResponse)
  }
}


const handleRedirection = new HandleRedirection()
handleRedirection.get('http://localhost:3000/redirect', (err, response) => {
  if(err) {
    console.log(err);
    return err;
  }
  console.log('Success with data: %s', response.data);
})