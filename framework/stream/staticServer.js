const http = require('http');
const fs = require('fs');
const zlib = require('zlib')

const roots = {
  getIndex: '/getIndex',
  getZip: '/getZip',
  errorPage: '/errorPage'
}
const port = 3000;

const server = http.createServer((req, res) => {
  console.log('Got request');
  console.log(req.url);
  req.url === roots.getIndex && fs.createReadStream(`${__dirname}/streamInfo.js`).pipe(res);
  if(req.url === roots.getZip) {
    res.writeHead(200, {'content-encoding': 'gzip'})
    fs.createReadStream(`${__dirname}/streamInfo.js`).pipe(zlib.createGzip()).pipe(res)
  }
  if(req.url === roots.errorPage) {
    res.writeHead(500, {'message': 'Error request'})
    res.end()
  }
})

server.on('listening', () => console.log(`Server up and running on ${port} port`))
server.on('error', (error) => console.log(`Error appeared: ${error}`))
server.listen(port);


setTimeout(() => {
  http.get('http://localhost:3000/errorPage', (response) => {
    const { statusCode } = response;
    response.on('data', (data) => {
      console.log('SUCCESS:', data);
      const writeStream = fs.createWriteStream(`${__dirname}/streamData/destinationFile.js`)
      writeStream.write(data)
      writeStream.end()
      // is equal to - fs.writeFileSync(`${__dirname}/streamData/destinationFile.js`, data)
    })
    if(statusCode === 500){
      console.log('SERVER ERROR:', response.headers.message);
    }
    response.on('error', (err) => {
      throw new Error('WENT WRRONG:', err)
    })
  })
  }, 1000)
