const cp = require('child_process');
/* If you just want to execute a single command and get output synchronously, use execFileSync:
* Because of the shell: true option above, we were able to use the shell syntax in the passed command
* Because of the stdio: 'inherit' option, when we execute the code, the child process inherits the main
* process stdin, stdout, and stderr. This causes the child process data events handlers to be triggered
* on the main process.stdout stream, making the script output the result right away.
*  */
{
  const bufferedOut = cp.execFileSync('echo', ['string to be printed'], {
    shell: true
  });
  const bufferedOut1 = cp.execFileSync('echo $ENV_VAR', {
    shell: true,
    stdio: 'inherit',
    env: {
      ENV_VAR: 'SET HERE'
    }
  });
  // console.log(bufferedOut.toString());
  console.log(bufferedOut1.toString());
}

/* If you want to execute multiple commands synchronously and programmatically
where the input of one depends on the output of another, use spawnSync: */
{
  const psOut = cp.spawnSync('ps', ['aux'], {
    shell: true
  });
  const grepOut = cp.spawnSync('grep', ['node'], {
    shell: true,
    input: psOut.stdout,
    encoding: 'utf8'
  });
  console.log(grepOut);
}

/* execSync, which executes a subshell synchronously and runs the commands
given. This can be handy when writing shell scripts in JavaScript */
{
  const exOut = cp.execSync('ps aux | grep node', {
    shell: true
  }).toString();
  // console.log(exOut);
}

/* Debbuging */
{
  try {
    cp.execSync('cd ./non-existent-dir', {
      encoding: 'utf8',
      shell: true
    });
  } catch (err) {
    // console.error('exit status was', err.status);
    // console.error('stderr', err.stderr);
  }
}