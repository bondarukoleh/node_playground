/* You want to execute an external application and stream the output. */
const cp = require('child_process');

const child = cp.spawn('echo', ['hello', 'world']);
child.on('error', console.error);
child.stdout.pipe(process.stdout); // child.stdout is readable here because it's stream that goes from child process.
// and it's hooked to node's writable process.stdout.
child.stderr.pipe(process.stderr);
//child.stdin - is oposite - writable, because it's a connection to child process.