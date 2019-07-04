const http = require('http');
const net = require('net');
const replModule = require('repl');

const server = http.createServer();

server.on('request', function (req, res) {
  res.end('Hello World');
});
server.listen(3000);

console.log('server listening on 3000');

net.createServer(function (socket) {
  const r = replModule.start({
    input: socket,
    output: socket,
    terminal: true,
    useGlobal: true //Allow scripts to be executed in global context versus a separate context
  });
  r.on('exit', function () { socket.end() });
  r.context.server = server; //Expose our server instance to REPL
}).listen(4000);

console.log('repl listening on 4000');