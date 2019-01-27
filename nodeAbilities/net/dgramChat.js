const dgram = require('dgram');
const readLine = require('readline')

const defautPort = 4321;

class Client {
  constructor(port, ip) {
    this.ip = ip;
    this.port = port;
    this.socket = dgram.createSocket('udp4')
    this.rl = readLine.createInterface(process.stdin, process.stdout)
  }

  startChating() {
    this.socket.send(Buffer.from('<JOIN>'), 0, 6, this.port, this.ip);
    this.rl.on('line', line => this.sendData(line)).on('close', _ => process.exit(0));

    this.socket.on('message', (message, rinfo) => {
      console.log(`\n${message.toString()}`);
    })
  }

  sendData(data) {
    this.socket.send(Buffer.from(data), this.port, this.ip, (err, bytes) => {
      console.log(`Message sent: ${data}`);
      this.rl.prompt()
    })
  }
}

class Server {
  constructor(port) {
    this.clients = [];
    this.server = dgram.createSocket('udp4');
    this.server.bind(port)
    this.server.on('message', (msg, rinfo) => {
      const clientId = `${rinfo.address}:${rinfo.port}`
      if (!this.clients[clientId]) {
        console.log(`Client ${clientId} isn't in ${this.clients} base. Adding him to base.`);
        this.clients[clientId] = rinfo;
      }
      if (msg.toString().match(/^</)) {
        console.log('Control message recived: %s', msg);
        return;
      }

      for (const client in this.clients) {
        if (client !== clientId) {
          const currClient = this.clients[client];
          const currMessage = `${currClient.address}:${currClient.port} sends: ${msg}`
          this.server.send(Buffer.from(currMessage), 0, currMessage.length, currClient.port,
          currClient.address, (err, bytes) => {
              if (err) console.error(err);
              console.log('Message sent to users: %s', msg);
            })
        }
      }
    });
    this.server.on('listening', _ => console.log(`Server running with config: %j`, this.server.address()))
  }
}

/*Usage. In one terminal  node .\nodeAbilities\net\dgram.js, in other node .\nodeAbilities\net\dgram.js startClient */
if (process.argv[2] === 'startClient') {
  new Client(defautPort, 'localhost').startChating()
} else {
  new Server(defautPort)
}