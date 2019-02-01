const fs = require('fs');
const tls = require('tls');
const path = require('path')

const options = {
  key: fs.readFileSync(path.resolve(__dirname, '../../../../../.ssh/server.pem')), //your private key here
  cert: fs.readFileSync(path.resolve(__dirname, '../../../../../.ssh/server-cert.pem')), //your server sertificate here
  ca: [fs.readFileSync(path.resolve(__dirname, '../../../../../.ssh/client-cert.pem'))], //your client sertificate here
  requestCert: true
};
const server = tls.createServer(options, function (cleartextStream) {
  console.log(`Got something`);
  const authorized = cleartextStream.authorized ? 'authorized' : 'unauthorized';
  console.log('Connected:', authorized);
  cleartextStream.write('Welcome!\n');
  cleartextStream.setEncoding('utf8');
  cleartextStream.pipe(cleartextStream);
});
server.listen(8000, function () {
  console.log('Server listening');
});