console.log('console.log')
setTimeout(() => {
  console.log('setTimeout')
}, 0)
setImmediate(() => {
  console.log('setImmediate 1')
})
setImmediate(() => {
  console.log('setImmediate 2')
})
process.nextTick(() => {
  console.log('process.nextTick')
})

/* About the node event lookup
1 - Timers
2 - I/O callbacks
3 - waiting, preparing
4 - questioning incoming connections, data, etc.About
5 - checking
6 - 'close' callbacks */

// remember recursive setTimeout, runs function with strict timeout.
// Timeout begins to run only after function is ended.
// setInterval - doesn't count the function run time, if while function
// has been running - timeout ended - it runs function immediately,
// so as far as I get - setInterval begin to count timer after it 
// start the function, not after function has ended.
// So if you need 100% timeout between functions - use recursive setTimeout.
