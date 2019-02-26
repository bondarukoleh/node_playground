process.on('message', (job) => {
  let result = null;
  if(job = 'uslessLoop'){
    try {
      for (var i = 0; i < 1000000000; i++){
        if(i === 99999999){
          console.log(`Work from process ${process.pid} done`);
          result = `Job result from ${process.pid} process`;
        }
      };
      process.send(result);
      process.exit(0);
    } catch (e){
      console.log(`Worker work fail`);
      process.send(e.message);
      process.exit(1);
    }
  }
})