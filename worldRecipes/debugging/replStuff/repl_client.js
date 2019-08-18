const net = require('net');

const socket = net.connect(4000);

process.stdin.setRawMode(true);
/* Treat stdin as a raw TTY input stream.
This allows, for example, the Tab key and Up Arrow key to behave as you’d expect
in a modern terminal session. */
process.stdin.pipe(socket); //user output passed to readable (in fact duplex) socket
socket.pipe(process.stdout); //response from server passed to writable (in fact duplex) socket
socket.once('close', function () {
  process.stdin.destroy();
  /* When the connection is terminated, destroy the stdin stream, allowing the process to exit. */
});