const dns = require('dns');

dns.resolve('google.com', (err, data) => {
  if(err) { console.log(err); }
  console.log(data);
});

dns.lookup('error', (err, data) => {
  if(err) { console.log(err); }
  console.log(data);
});