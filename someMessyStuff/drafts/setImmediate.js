// console.log(1)
// setTimeout(() => {
//   console.log(2)
// }, 0)
// setImmediate(() => {
//   console.log(3)
// })
// setImmediate(() => {
//   console.log(4)
// })
// process.nextTick(() => {
//   console.log(5)
// })

/* About the node event lookup
1 - Timers
2 - I/O callbacks
3 - waiting, prepearing
4 - questioning incomming connections, data, etc.About
5 - checking
6 - 'close' callbacks */

// remember recursive setTimeout, runs function with strict timeout.
// Timeout begins to run only after function is ended.
// setInterval - doesn't count the function run time, if while function
// has been running - timeout ended - it runs function imediatly, 
// so as far as I get - setInterval begin to count timer after it 
// start the function, not after function has ended.
// So if you need 100% tomeout between functions - use recursive setTimeout.  
