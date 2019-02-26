const path = require('path');
const http = require('http');
const worker = path.resolve(__dirname, './executableScripts/worker.js')
const { doSomeWork } = require('./executableScripts/workerPool.js');
console.log(doSomeWork);
const runJob = doSomeWork(worker);

const server = http.createServer(function (req, res) {
  console.log(`Got request: ${req.url}`);
  if (req.url === '/work') {
    runJob('uslessLoop', (err, result) => {
      if (err) {
        console.log(err);
        res.writeHead(500, { message: `Error appeared: ${err}` })
        return res.end()
      } else {
        console.log(`Success`);
        console.log(`Result is:`, result);
        return res.end(result);
      }
    })
  }
})
server.on('listening', () => console.log(`UP and running on 3000`));
server.listen(3000);

setTimeout(() => {
  console.log(`Sending request`);
  http.get('http://localhost:3000/work', (response) => {
    if(response.statusCode === 500){
      console.log(`Error from server`);
    }
    response.on('data', (data) => {
      console.log(`Got result1 from server: ${data}`);
    })
  })
  http.get('http://localhost:3000/work', (response) => {
    if(response.statusCode === 500){
      console.log(`Error from server`);
    }
    response.on('data', (data) => {
      console.log(`Got result2 from server: ${data}`);
    })
  })
  http.get('http://localhost:3000/work', (response) => {
    if(response.statusCode === 500){
      console.log(`Error from server`);
    }
    response.on('data', (data) => {
      console.log(`Got result3 from server: ${data}`);
    })
  })
  http.get('http://localhost:3000/work', (response) => {
    if(response.statusCode === 500){
      console.log(`Error from server`);
    }
    response.on('data', (data) => {
      console.log(`Got result4 from server: ${data}`);
    })
  })
  http.get('http://localhost:3000/work', (response) => {
    if(response.statusCode === 500){
      console.log(`Error from server`);
    }
    response.on('data', (data) => {
      console.log(`Got result5 from server: ${data}`);
    })
  })
}, 2000)
