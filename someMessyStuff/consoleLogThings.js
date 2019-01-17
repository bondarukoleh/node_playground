const util = require('util')

// const jsonFile = require('./someJson');
// console.log(`It's json %j`, jsonFile, );

/* Run node consoleLogThings.js 2> log.log and error will be in log file because 2 - is responsible for error stream
Standard streams come in three flavors: stdin, stdout, and stderr. In Unix terminals,
these are referred to with numbers. 0 is used for standard input, 1 is standard output,
and 2 is standard error.  Windows - same */
console.error('This is Error Message, goes to stderr');
console.log('Simple message');

function res(resFunc) {
    resFunc('Hello');
    console.timeEnd('Promise started'); //displays the duration from point console.time('Promise started') invoked.
}

function promise() {
    console.time('Promise started');
    return new Promise((resolve) => {
        console.trace();
        setTimeout(res, 2000, resolve)
    })
}

promise().then(console.log);

console.log(8..toString());

console.log(process.memoryUsage());
console.log(util.inspect(Object, {depth:null, showHidden: true}))

