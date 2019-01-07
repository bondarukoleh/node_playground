const { Writable } = require('stream');
const http = require('http');
const fs = require('fs');

class ReadStream extends Writable {
  constructor(options) {
    super(options)
  }
  _write(chunk, encoding, cb) {
    console.log(chunk.toString());
    cb()
  }
  end() {
    this.emit('thisIsTheEnd', 'Hello from end');
  }
}

const readStream = new ReadStream();

http.get('http://www.manning.com', (response) => {
  response.pipe(readStream)
});
readStream.on('thisIsTheEnd', console.log);
fs.createReadStream(__filename).pipe(readStream);
readStream.on('exit', (result) => console.log(`Reading finished, result: ${result}`));

/*Streams can be readable or writable, and are implemented with instances of
EventEmitter—see chapter 4 for more on events. Streams provide the means for creating
data flows between objects, and can be composed with LEGO-like modularity. */
