process.on('uncaughtException', (err) => {
  console.log('Got uncaught. Trying to restart gracefully');
  console.log(err);
})