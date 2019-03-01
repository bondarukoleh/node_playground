#!/usr/bin/env node

const { tailFib } = require('../index.js');
const passedNumber = Number(process.argv[2]);

if (isNaN(passedNumber)) {
  return console.error(`\nPlease pass a valid number to fibonaccimodule.\ni.e. fibonaccimodule 20`);
}

console.log(tailFib(passedNumber));
return tailFib; 