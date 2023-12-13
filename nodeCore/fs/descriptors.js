const fs = require('fs');
const path = require('path')
/* 'w+' - if you didn't pass data in it - will recreate a empty file, be careful */
/* 'a' - Open file for appending. The file is created if it does not exist.*/
const fd = fs.openSync(path.resolve(__dirname, '../data/watchedFile.txt'), 'r')
console.log(fd);
fs.closeSync(fd)

fs.writeSync(1, 'Logging to stdout')