const jsonFile = require('./someJson')
// console.log('%j', JSON.stringify(jsonFile));

// process.stdout - is a writable stream to stdout
process.stdin.setEncoding('utf8')
process.stdin.on('readable', () => {
  const chunk = process.stdin.read()
  if(process.stdin.read() !== null){
    process.stdout.write(`GOT DATA: ${process.stdin.read()}`)
  }
})

process.stdin.on('end', () => {
  process.stdout.write(`Reading DONE}`)
})