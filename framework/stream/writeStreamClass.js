const { Writable } = require('stream');
const http = require('http');
const fs = require('fs');
const path = require('path');

class WriteStream extends Writable {
  constructor(options) {
    super(options);
    this.on('drain', _ => console.log('drain event is FIRED'));
    this.on('data', data => console.log(`data is FIRED: ${data}`));
    this.on('exit', result => console.log(`Writing finished, result: ${result}`));
    this.on('pipe', _ => console.log('pipe is FIRED'));
    this.on('unpipe', _ => console.log('unpipe is FIRED'));
    this.on('close', _ => console.log('close is FIRED'));
    this.on('finish', _ => console.log('finish is FIRED'));
    this.on('thisIsTheEnd', console.log);
    this.on('error', (error) => {
      console.log(`Error appeared: ${error}`),
        this.emit('finish'),
        process.exit(1)
    });
  }

  _write(chunk, encode, cb) {
    console.log(`_write is called, current chunk: "${chunk}"`);
    /*Yeah you're right, it's not writing anywhere, we just console.log*/
    cb()
  }

  end(cb) {
    super.end(cb);
    this.emit('thisIsTheEnd', 'thisIsTheEnd is FIRED')
  }
}

const writeStream = new WriteStream();

// http.get('http://www.manning.com', (response) => {
//   response.pipe(writeStream)
// });
// fs.createReadStream(path.resolve(__dirname, '../data/text.txt')).pipe(writeStream);

/*
Each of the stream module base classes emits various events, which depend on
whether the base class is readable, writable, or both. The fact that streams inherit from
EventEmitter means you can bind to various standard events to manage streams, or
create your own custom events to represent more domain-specific behavior.

When working with stream.Readable instances, the readable event is important because 
it signifies that the stream is ready for calls to stream.read().
Attaching a listener to data will cause the stream to behave like the old streams
API, where data is passed to data listeners when it’s available, rather than through
calls to stream.read().
The error event is covered in detail in technique 28. It’ll be emitted if the stream
encounters an error when receiving data.
The end event signifies that the stream has received an equivalent of the end-of-file
character, and won’t receive more data. There’s also a close event that represents the
case where the underlying resource has been closed, which is distinct from end, and
the Node API documentation notes that not all streams will emit this event, so a rule of
thumb is to bind to end.
*/


class GreenStream extends Writable{
  constructor(opts){
    super(opts)
  }

  _write(chunk, encode, cb){
    process.stdout.write(`green collor text:) -> ${chunk}`);
    cb()
  }
}
process.stdin.pipe(new GreenStream()); 

/* another usage
cat ./data/text.txt | node ./writeStreamClass.js */