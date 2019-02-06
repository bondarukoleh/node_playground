process.on('message', (workObject) => {
  console.log(`Worker start working`);
  console.log(`Got: %j`, workObject);
  try {
    const result = workObject.work();
    console.log(`Worker work done successfully`);
    process.send(result);
    process.exit(0);
  } catch (e){
    console.log(`Worker work fail`);
    process.send(e.message);
    process.exit(1);
  }
})