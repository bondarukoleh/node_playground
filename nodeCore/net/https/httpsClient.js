const fs = require('fs');
const os = require('os');
const https = require('https');
const path = require('path')

var options = {
  key: fs.readFileSync(path.resolve(__dirname, '../../../../../.ssh/client.pem')),//your private key here
  cert: fs.readFileSync(path.resolve(__dirname, '../../../../../.ssh/client-cert.pem')),//your client sertificate here
  ca: [fs.readFileSync(path.resolve(__dirname, '../../../../../.ssh/server-cert.pem'))],//your server sertificate here
  servername: 'MyHostName', // Name that you've set when you created sertificate, can be os.hostName()
  method: 'GET',
  port: 8000,
  host: '' //your ip here
};

const req = https.request(options, (res) => {
  res.on('data', (data) => console.log(data.toString()));
});
req.end();
req.on('error', function (e) {
  console.error(e);
});