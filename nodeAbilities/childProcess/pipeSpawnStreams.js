const cp = require('child_process');
const path = require('path');

/* Not very good working on windows, or I cannot figure out */
console.log(`${path.resolve(__dirname, '../data/childProcessData/testToBeRead.txt')}`);
const cat = cp.spawn('cmd', [`${path.resolve(__dirname, '../data/childProcessData/textToBeRead.txt')}`, 'type'])
// cat.stdout.pipe(process.stdout)
// cat.stderr.pipe(process.stdout);
cat.stdout.on('data', (data) => {
  console.log(data);
  cat.kill()
})