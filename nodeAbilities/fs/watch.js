const fs = require('fs');
const path = require('path')

fs.watch(path.resolve(__dirname, '../data/watchedFile.txt'), {persistent: true}, (event, filename) => {
  console.log('event');
  console.log(event);
  console.log('filename');
  console.log(filename);
})
console.log('asdasd');
setTimeout(() => {
  const writeStream = fs.createWriteStream(path.resolve(__dirname, '../data/watchedFile.txt'), {flags: 'a'})
  writeStream.write('\n New line added')
  writeStream.end()
}, 2000)
