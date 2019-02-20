const heapdump = require('heapdump');

const string = '1 string to rule them all';
const leakyArr = [];
let count = 2;
setInterval(function () {
  leakyArr.push(string.replace(/1/g, count++));
  console.log(process.cpuUsage());
  console.log(process.memoryUsage());
  console.log(`Length of arr:`, leakyArr.length);
}, 1);

setInterval(() => {
  if(heapdump.writeSnapshot()) console.log(`Snap is done`)
}, 5000)