const fs = require('fs');
const {exec} = require('child_process');
const path = require('path');

const serverPath = path.resolve(__dirname, '../../nodeAbilities/stream/staticServer.js');

function watch(){
  const child = exec(`node ${serverPath}`);
  const watcher = fs.watch(serverPath, _ => {
    console.log('Server file changed. Reloading...');
    child.kill();
    watcher.close();
    watch();
  })
}

// watch();
// but better use nodemon package. npm i -g nodemon, and create nodemon.json file configuration.