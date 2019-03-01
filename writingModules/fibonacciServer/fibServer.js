const fastfib = require('fibonaccimodule');
const http = require('http');

const port = 4000;

const invalidNumber = function(res) {
  console.log('Invalid parameters of square');
  res.writeHead(500)
  return res.end(`Invalid parameters of square. 1 number allowed.`)
}

const invalidURL = function(res) {
  console.log('Operation not found');
  res.writeHead(404)
  return res.end(`Operation not found. Check URL`)
}

const areParamsValid = function(params){
  return (params.length && params.length < 3 && !!params[1] && !isNaN(parseInt(params[1]))) 
}

const server = http.createServer((req, res) => {
  if(req.url.includes('fibonacci')){
    console.log(`GOT URL - ${req.url}`);
    const params = req.url.split('/').filter(el => !!el);
    if(!areParamsValid(params)){ return invalidNumber(res) };
    res.writeHead(200)
    res.end(fastfib.tailFib(params[1]).toString());
  } else {
    console.log('invalidURL');
    return invalidURL(res)
  }
})

server.listen(port, _ => console.log(`Up and running on ${port}`));