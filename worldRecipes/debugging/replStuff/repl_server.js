const replModule = require('repl');
const net = require('net');

const port = 4000;

const server = net.createServer((client) => {
  const repl = replModule.start({
    input: client,
    output: client,
    terminal: true
  })

  client.on(`end`, _ => console.log(`Client off`))

  repl.on('exit', () => {
    console.log(`Repl died. Cutting the client off`);
    client.end()
  })
})

server.listen(port, _ => console.log(`Up and runnint on ${port}`));

// check it with nc localhost 4000
