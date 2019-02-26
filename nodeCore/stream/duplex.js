const { Duplex } = require('stream')

class MyDuplex extends Duplex {
  constructor(){
    super()
    this.waiting = false;
  }

  _write(chunk, encode, cb){
    this.waiting = false;
    this.push(`from _write: ${chunk}`);
    cb()
  }

  _read(){
    if(!this.waiting){
      this.push('Bring it on! $>');
      this.waiting = true;
    }
  }
}

const duplex = new MyDuplex()
process.stdin.pipe(duplex).pipe(process.stdout);