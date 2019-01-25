const fs = require('fs');
const path = require('path');

function removeFolderSync(dirToRemove) {
  if (fs.existsSync(dirToRemove)) {
    fs.readdirSync(dirToRemove).forEach((file) => {
      const currentFile = path.join(dirToRemove, file)
      if (fs.statSync(currentFile).isDirectory()) {
        removeFolderSync(currentFile);
      }
      fs.unlinkSync(currentFile);
    })
    fs.rmdirSync(dirToRemove);
  }
}

function findInDirSync(file, inFolder) {
  let result = [];
  function finder(folder) {
    const currentDirFiles = fs.readdirSync(folder)
    currentDirFiles.forEach(currentDirFile => {
      const currentPath = path.join(folder, currentDirFile)
      if (fs.statSync(currentPath).isDirectory()) {
        finder(currentPath)
      }
      if (currentDirFile === file) {
        result.push(currentPath)
      }
    })
    return result;
  }
  return finder(inFolder)
}


function findInDirAsync(file, folder, cb) {
  const result = [];
  let asyncOperations = 0;
  let errored = false

  function gotError(err){
    if(!errored) {
      cb(err)
      errored = true;
    }
  }

  function finder(folder) {
    asyncOperations++
    fs.readdir(folder, (err, currentDirFiles) => {
      if (err) return gotError(err);

      currentDirFiles.forEach((currentDirFile, i) => {
        const currentPath = path.join(folder, currentDirFile);
        asyncOperations++

        fs.stat(currentPath, (err, stats) => {
          if (err) gotError(err);
          if (stats.isDirectory()) finder(currentPath);
          if (stats.isFile() && currentDirFile === file) result.push(currentPath);

          asyncOperations--
          if(asyncOperations === 0) cb(null, result);
        })
      })
      asyncOperations--
      if(asyncOperations === 0) cb(null, result);
    })
  }
  finder(folder)
}

/* Usage */
/*
console.log('Sync search:', findInDirSync('text.txt', path.resolve(__dirname, '../../nodeAbilities')))
findInDirAsync('2.txt', path.resolve(__dirname, '../../nodeAbilities/data'), (err, data) => {
  if(err) console.log(err);
  if(data) console.log('Async search:', data);
})
*/
module.exports = { removeFolderSync, findInDirSync, findInDirAsync };
