const cp = require('child_process');
const path = require('path');
const fs = require('fs');
const pathToFile = path.resolve(__dirname, '../data/childProcessData/textToBeRead.txt');
const pathToErrLog = path.resolve(__dirname, '../data/childProcessData/errLog.txt');
const pathToOutLog = path.resolve(__dirname, '../data/childProcessData/outLog.txt');

/*We want to ignore FD 0 (stdin) since we won’t be providing any input to the child process.
But let’s capture any output from FDs 1 and 2 (stdout, stderr) just in case we need to do some debugging
later on. */

const errLogFileDescriptor = fs.openSync(pathToErrLog, 'a');
const outLogFileDescriptor = fs.openSync(pathToOutLog, 'a');

const child = cp.spawn(`cat`, [`${pathToFile}`],
 {detached: true, stdio: ['ignore', outLogFileDescriptor, errLogFileDescriptor]});

/* Now we'll exit parent process, even if child is still working */
child.unref(); //Remove reference of child in the parent process