const cp = require('child_process');
const cpus = require('os').cpus().length;

function doSomeWork(worker) {
  const awaiting = [];
  const readyPool = [];
  let poolSize = 0;

  return function runJob(job, cb){
    if(!readyPool.length && poolSize > cpus){
      return awaiting.push([runJob, job, cb])
    }

    const child = readyPool.length ? readyPool.shift() : (poolSize++, cp.fork(worker));
    let cbTriggered = false;
    
    child.removeAllListeners();

    child.once('message', (result) => {
      console.log(`Job done`);
      console.log(`SITUATION:`);
      console.log('awaiting');
      console.log(awaiting);
      console.log('readyPool');
      console.log(readyPool);
      console.log('awaiting');
      console.log(awaiting);
      cbTriggered = true;
      cb(null, result);
      readyPool.push(child);
      if(awaiting.length){
        setImmediate.apply(null, awaiting.shift());
      }
    })
  
    child.once('exit', (code, signal) => {
      if (!cbTriggered) {
        cb(new Error(`Process exits with code: ${code}, and signal: ${signal}`));
      }
      poolSize--;
      const childIndex = readyPool.indexOf(child);
      if(childIndex > -1){
        readyPool.splice(childIndex, 1)
      }
    })
  
    child.once('error', (err) => {
      if (!cbTriggered) {
        cb(err);
        cbTriggered = true;
      }
      child.kill();
    })
  
    child.send(job);
  }
};

module.exports = {doSomeWork}
