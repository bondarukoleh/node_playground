process.on('message', (msg) => {
  console.log(`Child PID:${process.pid} got message: ${msg}. Sending back...`);
  process.send(msg);
  console.log(`Child PID:${process.pid} will exit in 5 seconds`);
  setTimeout(_ => {
    console.log(`Child PID:${process.pid} exit.`);
    process.exit(0)
  }, 5000)
});