const cp = require('child_process');
const path = require('path')
const pathToExecutable = path.resolve(__dirname, './executableScripts/printArgsUnix')

cp.execFile(pathToExecutable, ['--firstArg=firsValue', '--secondArg=secondValue'], (err, stdout) => {
  err && console.log(err);
  console.log(`Got stdout: ${stdout}`);
})