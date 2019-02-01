const fs = require('fs');
const os = require('os');
const tls = require('tls');
const path = require('path')

const options = {
  key: fs.readFileSync(path.resolve(__dirname, '../../../../../.ssh/client.pem')),//your private key here
  cert: fs.readFileSync(path.resolve(__dirname, '../../../../../.ssh/client-cert.pem')),//your client sertificate here
  ca: [fs.readFileSync(path.resolve(__dirname, '../../../../../.ssh/server-cert.pem'))],//your server sertificate here
  servername: 'MyHostName', // Name that you've set when you created sertificate, can be os.hostName()
  port: 8000,
  host: '' //your ip here
};
const cleartextStream = tls.connect(options, function () {
  console.log(options);
  const authorized = cleartextStream.authorized ?
    'authorized' : 'unauthorized';
  console.log('Connected:', authorized);
  process.stdin.pipe(cleartextStream);
});
cleartextStream.on('error', (err) => {
  console.log(err);
})
cleartextStream.setEncoding('utf8');
cleartextStream.on('data', function (data) {
  console.log(data);
});