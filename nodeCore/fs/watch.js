const fs = require('fs');
const path = require('path')

/* .watch file can be file or directory */
fs.watch(path.resolve(__dirname, '../data/watchedFile.txt'), {persistent: true}, (event, filename) => {
  console.log('event');
  console.log(event);
  console.log('filename');
  console.log(filename);
})

fs.watchFile(path.resolve(__dirname, '../data/watchedFile.txt'), {persistent: true}, (curr, prev) => {
  console.log('Stats object of watched file after modification:', curr);
  console.log(`the current mtime is: ${curr.mtime}`);
  console.log('Stats object of watched file before modification:', prev);
  console.log(`the previous mtime was: ${prev.mtime}`);
});

setTimeout(() => {
  /* 'a' - means append, add data, not rewrite */
  const writeStream = fs.createWriteStream(path.resolve(__dirname, '../data/watchedFile.txt'), {flags: 'a'})
  writeStream.write('\n New line added')
  writeStream.end()
}, 2000)

fs.watch(path.resolve(__dirname, '../data'), console.log)
fs.watchFile(path.resolve(__dirname, '../data'), console.log)
