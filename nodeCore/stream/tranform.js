const {Transform} = require('stream');
const fs = require('fs');
const path = require('path');

class Parser extends Transform {
  constructor(){
    super()
  }

  _transform(chunk, encode, doneCb){
    const currentChunk = chunk.toString()
    const parsedObject = {}
    let word = []
    const words = []
    for(let i = 0; i < currentChunk.length; i++) {
      let char = currentChunk.charAt(i);
      if(![':', ',', ';'].includes(char)){
        word.push(char)
      } else if([':', ',', ';'].includes(char)){
        words.push(word.join(''))
        word.length = 0;
      }
    }
    for(let i = 0; i < words.length; i+=2){
      parsedObject[words[i]] = words[i+1]
    }
    this.push(JSON.stringify(parsedObject))
    doneCb()
  }
}

const parser = new Parser()
fs.createReadStream(path.resolve(__dirname, '../data/textToParse.txt')).pipe(parser).pipe(process.stdout)