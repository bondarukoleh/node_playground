const util = require('util')

// const jsonFile = require('./someJson');
// console.log(`It's json %j`, jsonFile, );

/* Run node consoleLogThings.js 2> log.log and error will be in log file because 2 - is responsible for error stream
Standard streams come in three flavors: stdin, stdout, and stderr. In Unix terminals,
these are referred to with numbers. 0 is used for standard input, 1 is standard output,
and 2 is standard error.  Windows - same */
function checkSomeStuff() {
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
  
  process.stdout.write('From process.stdout.write')
}
// checkSomeStuff()

function coloredText(){
  /* \x1b[Color_code_backgroundmYour_text_here\x1b[Color_code_foregroundm
   Notice the m? it MUST be there otherwise the color will not appear
   color code for blue is [34, 89], so the first part will be \x1b[34m followed
   by my name nnamdi, then last \x1b[89m.
    Color 	Color code
    blue 	[34, 89]
    yellow 	[33, 89]
    red 	[31, 89]
    cyan 	[36, 89]
    green 	[32, 89]
    magenta 	[35, 89]
    white 	[37, 89]
    gray 	[30, 89]

    Style 	Style code
    reset 	[0, 0]
    bold 	[1, 22]
    dim 	[2, 22]
    italic 	[2, 23]
    underline 	[4, 24]
    inverse 	[7, 27]
    hidden 	[8, 28]
    strikethrough 	[9, 29]
  */
 console.log("\x1b[34mBlue text \x1b[89m")
 console.log("\x1b[0m") // to reset
 console.log("\x1b[1m Bold \x1b[22m")
 console.log("\x1b[4m Underscore \x1b[24m")
}

coloredText()
