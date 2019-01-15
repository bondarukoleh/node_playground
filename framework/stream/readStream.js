const fs = require('fs');

const errorReadStream = fs.createReadStream('not_existing_file');
errorReadStream.on('error', (error) => {
  console.log('trace');
  console.trace();
  console.error('STACK:', error.stack);
  console.error('ERROR:', error);
})