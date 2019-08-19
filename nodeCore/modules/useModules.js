const module2 = require('./module2');
const whatsHere = require('./module1');
console.log(whatsHere); // { func1: { b: 2 }, func2: [Function: someFunction] }
console.log(`50 canadian dollars in US: ${module2.canadianToUS(50)}`); // 50 canadian dollars in US: 45.5
console.log(`50 US dollars in canadian: ${module2.USToCanadian(50)}`); // 50 US dollars in canadian: 54.95
whatsHere.asyncFunc.then(console.log)
