const fs = require('fs');
const https = require('https');
const path = require('path');

const port = 8000;

const options = {
  key: fs.readFileSync(path.resolve(__dirname, '../../../../../.ssh/server.pem')),//your private key here
  cert: fs.readFileSync(path.resolve(__dirname, '../../../../../.ssh/server-cert.pem')),//your server sertificate here
  ca: [fs.readFileSync(path.resolve(__dirname, '../../../../../.ssh/client-cert.pem'))],//your client sertificate here
  requestCert: true
};
const server = https.createServer(options, function (req, res) {
  console.log('Got request');
  const authorized = req.socket.authorized ? 'authorized' : 'unauthorized';
  res.writeHead(200);
  res.write('Welcome! You are ' + authorized + '\n');
  res.end();
});
server.listen(port, () => console.log('Server listening on port:', port));