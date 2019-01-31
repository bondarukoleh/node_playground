const http = require('http');

const port = 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/redirect') {
    console.log('Got redirect request');
    res.writeHead(301, { 'location': 'http://localhost:3000/redirectedPage' });
    return res.end();
  };
  if (req.url === '/redirectedPage') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write(`You've just got redirected here`);
    return res.end();
  };
  // console.log('Got request');
  // res.writeHead(200, { 'Content-Type': 'text/plain' });
  // res.write('Hello fella!');
  // res.end();
});

server.on('listening', () => console.log(`Server up and running on ${port} port`));
server.listen(port);