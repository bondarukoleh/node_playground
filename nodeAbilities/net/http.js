const http = require('http');

const port = 3000;

const server = http.createServer((req, res) => {
  if(req.url === '/special') {
    console.log('Got special request');
    res.write('Yeah you got it!');
    return res.end();
  };
  if(req.url === '/error') {
    // res.writeHead(500, { 'Error-Message': http.STATUS_CODES[500] });
    res.writeHead(500);
    res.write(http.STATUS_CODES[500]);
    return res.end();
  };
  console.log('Got request');
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('Hello fella!');
  res.end();
});

server.on('listening', () => console.log(`Server up and running on ${port} port`));
server.on('error', (error) => console.log(`Error appeared: ${error}`));
server.on('connection', (socket) => {
  console.log(`Have a connection`)
  /* socket.on('close', _ => console.log(`Connection down, and server shuld too.`),
   server.close(_ => console.log('SHUTTED'))) - Shutting server vilently,
    better destroy all socket connections before*/
  socket.on('close', _ => console.log(`Connection down`),
   server.unref(_ => console.log('SHUTTED'))) /* Waits untill all sockets out */
});
server.listen(port);

setTimeout(() => {
  http.get('http://localhost:3000/special', (response) => {
    const { statusCode } = response;
    console.log(statusCode);
    response.on('data', (data) => {
      console.log('Have response: %s', data);
    })
    if (statusCode === 500) {
      console.log('SERVER ERROR:', response.headers);
    }
    response.on('error', (err) => {
      throw new Error('WENT WRONG:', err)
    })
  })
}, 1000)

setTimeout(() => {
  http.get('http://localhost:3000/error', (response) => {
    const { statusCode } = response;
    response.on('data', (data) => {
      console.log('Have response: %s', data);
    })
    if (statusCode === 500) {
      console.log('SERVER ERROR:', response.headers);
    }
    response.on('error', (err) => {
      throw new Error('WENT WRRONG:', err)
    })
  })
}, 4000)
