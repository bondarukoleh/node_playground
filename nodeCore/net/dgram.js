const dgram = require('dgram');
const fs = require('fs');
const path = require('path');

const defautSize = 16;
const defautPort = 4321;

class Client {
  constructor(port, ip) {
    this.socket = dgram.createSocket('udp4');
    this.port = port;
    this.ip = ip;
    this.readStrem = fs.createReadStream(path.resolve(__dirname, '../data/text.txt'))
    // this.socket.bind(port)
  }

  startSendingMessage() {
    this.readStrem.on('readable', _ => {
      this.sendData()
    })
  }

  sendData() {
    const message = this.readStrem.read(defautSize); // set the size of chunk to read
    if (!message) {
      return this.socket.unref()
    }
    this.socket.send(message, 0, message.length, this.port, this.ip, (err, bytes) => {
      if(err) console.error(err);
      console.log(`Bytes from send callback: ${bytes}`);
      this.sendData()
    })
  }
}

class Server {
  constructor(port) {
    this.socket = dgram.createSocket('udp4');
    // this.socket.on('message', message => console.log(`Message from client: ${message}`))
    this.socket.on('message', message => process.stdout.write(`${message}`))
    this.socket.on('listening', _ => console.log(`Server ready: %j`, this.socket.address()))
    this.socket.bind(port)
  }
}

/*Usage. In one terminal  node .\nodeCore\net\dgram.js, in other node .\nodeCore\net\dgram.js startClient */
if (process.argv[2] === 'startClient') {
  new Client(defautPort, 'localhost').startSendingMessage()
} else {
  new Server(defautPort)
}

