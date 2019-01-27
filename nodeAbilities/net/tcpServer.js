const net = require('net');
const fs = require('fs');
const path = require('path');
const { expect } = require('chai');

const port = 6000;
let clients = 0;

const server = net.createServer(client => {
  clients++
  const clientId = clients;
  console.log(`Client with id: ${clientId} connected.`);

  client.on('end', _ => {
    console.log(`Client with id: ${clientId} disconnected.`);
    setTimeout(_ => server.unref(), 5000 /* Exit server when he has no connected users */)
  });

  client.write(`Welcome dear user, your id - ${clientId}`);

  client.on('data', data => console.log(`client send us data - ${data}`))
  /* Send some data over tcp */
  // let readStrem = fs.createReadStream(path.resolve(__dirname, './netInfo.txt'), {encoding: 'utf8'})
  // const buff = fs.readFileSync(path.resolve(__dirname, './netInfo.txt'))
  // readStrem.pipe(client) ends connection.
  // client.write(buff);
  // client.pipe(client); /*We can pipe everything back to client */
})

server.listen(port, _ => {
  console.log(`Server running on port ${port}`)
  /* Tests */
  getClientId((err, id) => {
    if(err) console.log('Error from client:', err);
    expect(id).to.eq('1', `Id of first connection should be 1, got: ${id}`)
    /* Second request should be after first. It's ugly tests, sould be emplemented with promises. */
    getClientId((err, id) => {
      if(err) console.log('Error from client:', err);
      expect(id).to.eq('2', `Id of second connection should be 2, got: ${id}`)
    })
  })
});

function getClientId(done) {
  const client = net.connect(6000, 'localhost', _ => console.log('Client connected.'));
  client.on('data', data => {
    const response = data.toString();
    const id = response.split('- ')[1];
    client.end()
    done(null, id)
  })

  client.on('error', error => {
    console.log(`Error rised`);
    done(error)
  })
}