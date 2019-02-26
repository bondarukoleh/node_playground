const cp = require('child_process');
const path = require('path');

const child = cp.fork(path.resolve(__dirname, './executableScripts/sendBack.js'))
child.on('message', (msg) => {
  console.log(`Parent PID:${process.pid} got message from child: ${msg}`);
})
child.send('Hello from parent process!')