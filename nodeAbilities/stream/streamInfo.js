/*Streams can be readable or writable, and are implemented with instances of
EventEmitter—see chapter 4 for more on events. Streams provide the means for creating
data flows between objects, and can be composed with LEGO-like modularity. */

/*
* Stream types:
■ Built-in—Many of Node’s core modules implement streaming interfaces; for
example, fs.createReadStream.
■ HTTP—Although technically network streams, there are streaming modules
designed to work with various web technologies.
■ Parsers—Historically parsers have been implemented using streams. Popular
third-party modules for Node include XML and JSON parsers.
■ Browser—Node’s event-based streams have been extended to work in browsers,
offering some unique opportunities for interfacing with client-side code.
■ Audio—James Halliday has written some novel audio modules that have streamable
interfaces.
■ RPC (Remote Procedure Call)—Sending streams over the network is a useful way to
implement interprocess communication.
■ Test—There are stream-friendly test libraries, and tools for testing streams
themselves.
■ Control, meta, and state—There are also more abstract uses of streams, and modules
designed purely for manipulating and managing other streams.
*/

/*
stream.Readable _read(size) - Used for I/O sources that generate data
stream.Writable _write(chunk, encoding, callback) - Used to write to an underlying output destination
stream.Duplex _read(size), _write(chunk, encoding, callback) - A readable and writable stream,
  like a network connection
stream.Transform _flush(size), _transform(chunk,encoding, callback) - A duplex stream that changes
data in some way, with no limitation on matching input

Opening a read stream to an existing file - var rstream = fs.createReadStream('existingFile');
Opening a write stream for storing data in a file - var wstream = fs.createWriteStream('fileToWrite');
Copy File
var rstream = fs.createReadStream('existingFile');
var wstream = fs.createWriteStream('myFileToWriteTo');
rstream.pipe(wstream);

var server = http.createServer(function (req, res) {
  var rstream = fs.createReadStream('existFile'); //тоесть передать ответ маленькими пачками
  rstream.pipe(res);
}).listen(8000, '127.0.0.1');

Readable streams:
HTTP responses on the client
HTTP requests on the server
fs read stream
zlib stream
crypto streams
TCP sockets
child process stdout and stderr
process.stdin

Writable streams:
HTTP requests on the client
HTTP responses on the server
fs write stream
zlib stream
crypto streams
TCP sockets
child process stdin
process.stdout process.stderr

A readable stream is an abstraction for a source from which data can be consumed.
allows to read data from the stream
An example of that is the fs.createReadStream method.
Reading data from client request on the server.

A writable stream is an abstraction for a destination to which data can be written.
allows to write data to the strem
An example of that is the fs.createWriteStream method.
Writing data to response to the client from the server.

A duplex streams is both Readable and Writable. An example of that is a TCP socket.
allows to read and write data to the stream

readable.pipe(duplexA).pipe(duplexB).pipe(writable)
# Which is equivalent to:
readable.pipe(duplexA)
duplexA.pipe(duplexB)
duplexB.pipe(writable)

So since stream is inherited from EventEmiter - we can rely on events that is fired.
When we create a read strem, createReadStream cuts source on pieces, and collects them
in inner buffer that it has. When the inner buffer is full, it pushes this chunk to the stream.
Thats when, "data" event fired, it tells us that chunk data is passed to the stream. 

The fs.createReadStream method takes an options argument that can include a bufferSize property.
and each chunk in every stream can be specific size - it increases memory usage efficiency for streaming them.
*/
