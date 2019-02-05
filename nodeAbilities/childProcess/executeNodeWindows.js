const cp = require('child_process');
const path = require('path')
const pathToBat = path.resolve(__dirname, './executableScripts/printArgs.bat')

cp.execFile(pathToBat, ['--firstArg=firsValue', '--secondArg=secondValue'], (err, stdout) => {
  err && console.log(err);
  console.log(`Got stdout: ${stdout}`);
})