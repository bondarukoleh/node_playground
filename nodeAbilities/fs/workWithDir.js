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

function findInDirSync(file, folder) {
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
    console.log('--------------------------------');
    console.log('START finder');
    console.log('asyncOperations:', asyncOperations);
    console.log('result:', result);
    console.log('WHEREAMI:', folder);
    asyncOperations++
    fs.readdir(folder, (err, currentDirFiles) => {
      console.log('--------------------------------');
      console.log('START readdir');
      console.log('asyncOperations:', asyncOperations);
      console.log('result:', result);
      console.log('WHAT WE GOT:', currentDirFiles);
      if (err) return gotError(err);

      currentDirFiles.forEach((currentDirFile, i) => {
        const currentPath = path.join(folder, currentDirFile);

        asyncOperations++
        console.log('/////////////');
        console.log('ITERATION:', i);
        console.log('asyncOperations:', asyncOperations);
        fs.stat(currentPath, (err, stats) => {
          console.log('--------------------------------');
          console.log('START stat');
          console.log('asyncOperations:', asyncOperations);
          console.log('result:', result);
          console.log('WHAT WE GOT:', currentPath);
          if (err) gotError(err);
          if (stats.isDirectory()) {
            console.log('GOT DIR, going to another circle');
            finder(currentPath);
          };
          if (stats.isFile() && currentDirFile === file) {
            console.log('GOT FILE THAT I NEED');
            result.push(currentPath);
          };

          console.log('+++++++++++++++ MINUS ASYNC OPERATION');
          asyncOperations--
          console.log(`After minus:`, asyncOperations);
          if(asyncOperations === 0) {
            console.log('CALLING CB FROM stat');
            cb(null, result);
          };
        })
      })
      asyncOperations--
      if(asyncOperations === 0) {
        console.log('CALLING CB FROM readdir');
        cb(null, result);
      };
    })
  }
  finder(folder)
}

// console.log(findInDirSync('text.txt', path.resolve(__dirname, '../../nodeAbilities')))
findInDirAsync('2.txt', path.resolve(__dirname, '../../nodeAbilities/test'), (err, data) => {
  if(err) console.log(err);
  if(data) console.log('DATA:', data);
})

module.exports = { removeFolderSync };
