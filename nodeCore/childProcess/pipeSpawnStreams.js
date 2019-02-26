const cp = require('child_process');
const path = require('path');

/* Not very good working on windows, or I cannot figure out */
/*console.log(`${path.resolve(__dirname, '../data/childProcessData/textToBeRead.txt')}`);
const cat = cp.spawn('cmd', [`${path.resolve(__dirname, '../data/childProcessData/textToBeRead.txt')}`, 'type'])
cat.stdout.pipe(process.stdout)
cat.stderr.pipe(process.stdout);
cat.stdout.on('data', (data) => {
  console.log(data);
  cat.kill()
})*/

const cat = cp.spawn('cat', [`${path.resolve(__dirname, '../data/childProcessData/textToBeRead.txt')}`])
const sort = cp.spawn('sort')
const uniq = cp.spawn('uniq')
cat.stdout.pipe(sort.stdin)
sort.stdout.pipe(uniq.stdin);
uniq.stdout.pipe(process.stdout);