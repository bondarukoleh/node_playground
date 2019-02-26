const fs = require('fs');
const path = require('path');

const { removeFolderSync } = require('./workWithDir')
const lockDirPath = path.resolve(__dirname, '../data/lockDir');
const lockFilePath = `${lockDirPath}/${process.pid}`
let hasLock = fs.existsSync(lockDirPath);

/* If lockFile exist - then some abstract "config" shouldn't be modified.
But we need everyone get to know about it. */
function lock(cb) {
  if (hasLock) return cb('File is locked already');

  fs.mkdir(lockDirPath, (err) => {
    if (err) return cb(err);
    fs.writeFile(lockFilePath, `Process ${process.pid} updating the config, changes prohibited`, (err) => {
      if (err) console.err(err);
      hasLock = true;
      console.log('LOCK CREATED');
      return cb()
    })
  })
}

function unlock(cb) {
  if (!hasLock) return cb('File is unlocked already');
  fs.unlink(lockFilePath, (err) => {
    if (err) return cb(err);
    fs.rmdir(lockDirPath, (err) => {
      if (err) return cb(err);
      hasLock = false;
      cb()
    })
  })
}

/*In case something went wrong */
setTimeout(() => {
  process.on('exit', () => {
    if(hasLock) {
      removeFolderSync(lockDirPath)
      console.log('Forced removed lock synchroniously');
    }
  })
}, 5000)


/* Usage */
/*
lock((err) => {
  if(err) {
    console.log(`Some process updating config already:`, err);
    return;
  };
  console.log('Do some config change');

  unlock((err) => {
    if(err) {
      console.log(`Couldn't unlock the file`, err);
      return;
    };
    console.log('Now everyone can update config, it is unlocked.');
  })
});
*/