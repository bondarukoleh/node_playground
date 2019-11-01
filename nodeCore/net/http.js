const http = require('http');

const port = 3000;

const server = http.createServer((req, res) => {
  let requestBody = ''

  if(req.url === '/special') {
    console.log('Got special request');
    res.write('Yeah you got it!');
    return res.end();
  };

  if (req.url === '/special' && req.method === 'POST') {
    console.log('Got POST request');
    console.log('HEADERS %j', req.headers);
    req.on('data', (chunk) => {
      requestBody += chunk.toString();
    })
    req.on('end', () => {
      // do something with requestBody since it passed fully
    })
    return res.end();
  }

  if(req.url === '/error') {
    // res.writeHead(500, { 'Error-Message': http.STATUS_CODES[500] });
    res.writeHead(500);
    res.write(http.STATUS_CODES[500]);
    return res.end();
  };
  console.log('Got request');
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('Hello fella!');
  res.end();
});

server.on('listening', () => console.log(`Server up and running on ${port} port`));
server.on('error', (error) => console.log(`Error appeared: ${error}`));
server.on('connection', (socket) => {
  console.log(`Have a connection`)
  /* socket.on('close', _ => console.log(`Connection down, and server shuld too.`),
   server.close(_ => console.log('SHUTTED'))) - Shutting server vilently,
    better destroy all socket connections before*/
  socket.on('close', _ => console.log(`Connection down`),
   server.unref(_ => console.log('SHUTTED'))) /* Waits untill all sockets out */
});
server.listen(port);

// setTimeout(() => {
//   http.get('http://localhost:3000/special', (response) => {
//     const { statusCode } = response;
//     console.log(statusCode);
//     response.on('data', (data) => {
//       console.log('Have response: %s', data);
//     })
//     if (statusCode === 500) {
//       console.log('SERVER ERROR:', response.headers);
//     }
//     response.on('error', (err) => {
//       throw new Error('WENT WRONG:', err)
//     })
//   })
// }, 1000)
//
// setTimeout(() => {
//   http.get('http://localhost:3000/error', (response) => {
//     const { statusCode } = response;
//     response.on('data', (data) => {
//       console.log('Have response: %s', data);
//     })
//     if (statusCode === 500) {
//       console.log('SERVER ERROR:', response.headers);
//     }
//     response.on('error', (err) => {
//       throw new Error('WENT WRRONG:', err)
//     })
//   })
// }, 4000)


const orderUpdatedBody = {
  messageId: 'jlikj34oiuj34io5u234905uoi4j3o4j5',
  event: 'some_event',
  payload: {
    orderId: 'lkjhfdsj9df-sadjfasduj908-aksdjfl',
    status: 1,
    sellerId: 'sdfliu0897-asdfd789-asdlfjhl8',
  }
};

const options = {
  method: 'POST',
  port: 3000,
  host: 'host_name_without_protocol',
  path: '/special',
  headers: {
    'uuid': 'asdfaefda8ds09f70a9ef9'
  }
};

// const postUpdate = () => {
//   const req = http.request(options, (res) => {
//     const {statusCode} = res;
//     console.log(`STATUS OF RESPONSE ${statusCode}`);
//     res.on('data', (data) => {
//       console.log('GOT DATA FROM SERVER');
//       console.log(data.toString());
//     });
//   });
//   req.write(JSON.stringify(orderUpdatedBody));
//   req.end();
//   req.on('error', function (e) {
//     console.log('ERROR DURING REQUEST');
//     console.error(e);
//   });
// };

// setTimeout(postUpdate, 2000);