/*
What ultimately gets exported in your application is module.exports. "exports" is set
up as a global reference to module.exports, which initially is defined as an empty
object that you can add properties to. exports.myFunc is shorthand for
module.exports.myFunc.
As a result, if exports is set to anything else, it breaks the reference between
module.exports and exports

ATTENTION: Modules are cached globally in Node, so
if we have another file that also requires config.json and we modify it, it’s modified
everywhere that module is used in our application. Better require it,
and work locally with config object.
*/

const module2 = require('./module2');
const whatsHere = require('./module1');
console.log(whatsHere);
console.log(`50 canadian dollars in US: ${module2.canadianToUS(50)}`);
console.log(`50 US dollars in canadian: ${module2.USToCanadian(50)}`);
