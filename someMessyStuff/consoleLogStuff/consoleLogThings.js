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

// coloredText()

/* console.assert */
function quickAssert() {
  const value = 10;
  console.assert(value === 10, `Won't be printed`)
  console.assert(value !== 10, `Error message: ${value} should be 10`)
  //AssertionError [ERR_ASSERTION]: Error message: 10 should be 10
}
// quickAssert()

function countFunctionCall() {
  function testFunction(){
    console.count();
  }

  testFunction(); // default: 1
  testFunction(); // default: 2

  console.countReset(); // to flush the counter

  function test2(arg1, arg2) {
    console.count(arg1);
    console.count(arg2);
  }

  test2('First arg') // First arg: 1 default: 1
  test2(undefined,'Second arg') // default: 2 Second arg: 1
  test2(undefined,'Second arg') // default: 3 Second arg: 1
}
// countFunctionCall()

function messageTypes() {
  console.info(`In firefox - it will be with "i" icon`);
  console.warn(`Should be with yellow color`);
  console.error(`Should be with red color`);
}
// messageTypes()

function printObj() {
  const o = {
    firstLevel: '123213',
    firstLevel2: {
      lala: 123,
      otherObj: {
        lala2: 123123,
        arr: [1, 2, 3]
      }
    }
  }

  console.log(o);
  console.dir(o); // prints in different way in browser
  // console.dirxml(o); // prints dom elements, but I didn't notice the difference
}
// printObj()

function groupPrinting() {
  const group1 = 'Some group to print:'
  const group2 = 'Inner group:'

  console.group(group1);
  console.log('element 1');
  console.log('element 2');
  console.group(group2);
  console.log('inner element 1');
  console.log('inner element 2');
  console.groupEnd(group2);
  console.log('element 3');
  console.groupEnd(group1);
}
// groupPrinting()

// console.table({a: 1}); // works in browser


function patterns(){
  const str = 'This is string';
  const digit = 123;
  const floating = 123.123;
  const o = {a:1, b:2};
  const j = {"a":"some value", "b":2};
  console.log('"%s" for a String', str);
  console.log('"%d" or "%i" for Number', digit, digit);
  console.log('"%f" for Floating points', floating);
  console.log('"%o" for an Object', o);
  console.log('"%j" for an JSON', j);
}
// patterns()
