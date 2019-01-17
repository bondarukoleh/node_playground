const {Readable} = require('stream');
const util = require('util');
const fs = require('fs');

function checkPositiveInteger(param){
  if(Number.isInteger(param) && (Math.sign(param) > 0)){
    return param;
  } else {
    throw new Error(`Parametr ${param} must be integer!`)
  }
}  

class ReadStream extends Readable {
    constructor({options, pushCounts = 10}) {
        super(options);
        this.pushCounts = checkPositiveInteger(pushCounts);
        this.on('data', data => console.log(`data is FIRED: ${data}`));
        this.on('exit', (result) => console.log(`Reading finished, result: ${result}`));
        this.on('error', (error) => {
            console.log(`Error appeared: ${error}`),
                this.emit('finish'),
                process.exit(1)
        });
    }

    _read() {
        console.log(`Start reading...`);
        /*generate some data to send*/
        if(!this.pushCounts){
          console.log('DONE');
          this.push() // Done  
        } else {
          this.push(util.inspect(process.memoryUsage()))
          this.pushCounts--
          console.log('After minus');
          console.log(this.pushCounts)
        }
    }
}

/*Just an example of error handling
 const errorReadStream = fs.createReadStream('not_existing_file');
  errorReadStream.on('error', (error) => {
  console.error('ERROR:', error);
 })*/

module.exports = {ReadStream}

class JSONLineReader extends Readable {
  constructor(source){
    super()
    this.source = source;
    this.foundLineEnd = false;
    this.buffer = '';
    source.on('readable', function () {
      this.read();
    }.bind(this));
  }

  _read(){
    let chunk;
    let line;
    let lineIndex;
    let result;
    if (this.buffer.length === 0) {
      chunk = this.source.read();
      this.buffer += chunk;
    }
    lineIndex = this.buffer.indexOf('n');
    if (lineIndex !== -1) {
      line = this.buffer.slice(0, lineIndex);
      if (line) {
        result = JSON.parse(line);
        this.buffer = this.buffer.slice(lineIndex + 1);
        this.emit('object', result);
        this.push(util.inspect(result)); //for further stream consumers
      } else {
        this.buffer = this.buffer.slice(1);
      }
    }
  }
}
// const input = fs.createReadStream(__dirname + '/json-lines.txt', {encoding: 'utf8'});
// const jsonLineReader = new JSONLineReader(input);
// jsonLineReader.on('object', function (obj) {
//   console.log('pos:', obj.position, '- letter:', obj.letter);
// });


class ReadObjects extends Readable{
  constructor(options = {objectMode: true}){
    super(options)
  }
  
  _read(){
    console.log('_read called');
    this.push(process.memoryUsage())
  }
}

const readObject = new ReadObjects()
console.log('created instance');
const data = readObject.read()
readObject.on('readable', () => { // called when it ready to get more data as far as I got
  console.log('Type: %s, value: %j', typeof data, data);
})
