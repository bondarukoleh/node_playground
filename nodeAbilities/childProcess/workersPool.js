const cp = require('child_process');
const path = require('path');

/* BROKEN, since haven't created some interesting task for worker */

function doSomeWork(workToDo, cb) {
  const child = cp.fork(path.resolve(__dirname, './executableScripts/worker.js'))
  let cbTriggered = false;
  child.send(workToDo);

  child.once('message', (result) => {
    console.log(`Job done`);
    cbTriggered = true;
    cb(result);
  })

  child.once('exit', (code, signal) => {
    if(!cbTriggered){
      cb(new Error(`Process exits with code: ${code}, and signal: ${signal}`));
    }
  })

  child.once('error', (err) => {
    if(!cbTriggered){
      cb(err);
      cbTriggered = true;
    }
  })
  console.log(workToDo);
}
const workObject = {
  work: () => {
    return (2 + 2);
  }
}

doSomeWork(workObject, (err, result) => {
  err && console.log(err);
  console.log(`Result is:`, result);
})