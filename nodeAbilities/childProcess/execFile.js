const cp = require('child_process');
/* You want to execute an external application and get the output. */
console.log('PATH');
console.log(process.env.PATH.split(':').join('\n'));

cp.execFile('echo', ['hello', 'world!'], (err, stdout, stderr) => {
  if (err) {
    console.log(`Got error:`, err);
  }
  console.log(`Stdout data:`, stdout);
  console.log(`Stderr data:`, stderr);
})

cp.execFile('ls', ['non-existent-directory-to-list'],
  function (err, stdout, stderr) {
    console.log(`err data:`, err);
    console.log(`Stderr data:`, stderr);
  });