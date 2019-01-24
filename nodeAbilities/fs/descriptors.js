/* 'w+' - if you didn't pass data in it - will recreate a empty file, be carefull */
const fd = fs.openSync(path.resolve(__dirname, '../data/watchedFile.txt'), 'r')
console.log(fd);
fs.closeSync(fd)

fs.writeSync(1, 'Logging to stdout')