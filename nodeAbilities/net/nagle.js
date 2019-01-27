const net = require('net');

const port = 8000;

const server = net.createServer(client => {
  client.setNoDelay(true);
  client.write('377375042377373001', {encoding: 'binary'});
  console.log('client connected');
  client.on('end', _ => {
    console.log('client disconnected');
    server.unref(); /* Call unref() so that when last client disconnects, program exits. */
  });
  client.on('data', data => {
    console.log(`CLIENT SENT DATA TO SERVER: ${data}`);
    // client.write(data.toString()); /*Sent data back to client */
  });
});
server.listen(port, _ => console.log('server up, port:', port));