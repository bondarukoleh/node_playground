const { Writable } = require('stream');
const http = require('http');
const fs = require('fs')

class ReadStream extends Writable {

  constructor(options){
    super(options)
  }

  _write(chunk, encoding, cb){
    console.log(chunk.toString())
    cb()
  }

  end(){
    this.emit('thisIsTheEnd', 'Hello from end')
  }
}
module.exports = {ReadStream} ;


const readStream = new ReadStream()
http.get('http://www.manning.com',  (response) => {
  console.log('GOT RESPONSE FROM HTTP');
  response.pipe(readStream)
})
readStream.on('thisIsTheEnd', console.log)

fs.createReadStream(__filename).pipe(readStream)
readStream.on('exit', (result) => console.log(`Reading finished, result: ${result}`))