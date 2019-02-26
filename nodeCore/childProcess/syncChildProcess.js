const cp = require('child_process');
/* If you just want to execute a single command and get output synchronously, use execFileSync: */
{
  const bufferedOut = cp.execFileSync('echo', ['string to be printed']);
  // console.log(bufferedOut.toString());  
}

/* If you want to execute multiple commands synchronously and programmatically
where the input of one depends on the output of another, use spawnSync: */
{
  const psOut = cp.spawnSync('ps', ['aux']);
  const grepOut = cp.spawnSync('grep', ['node'], {
    input: psOut.stdout,
    encoding: 'utf8'
  });
  // console.log(grepOut);
}

/* execSync, which executes a subshell synchronously and runs the commands
given. This can be handy when writing shell scripts in JavaScript */
{
  const exOut = cp.execSync('ps aux | grep node').toString();
  // console.log(exOut);
}

/* Debbuging */
{
  try {
    cp.execSync('cd ./non-existent-dir', {
      encoding: 'utf8'
    });
  } catch (err) {
    // console.error('exit status was', err.status);
    // console.error('stderr', err.stderr);
  }
}