const http = require('http');
const url = require('url');

const port = 8080;

/* BROKEN, for some reason. Even if I set up this as a proxy server in network properties
 - it's not act as proxy, don't have much time to investigate why */

const server = http.createServer((req, res) => {
  console.log(`Got request to:`, req.url);
  const options = url.parse(req.url)
  options.headers = req.headers;

  const proxyRequest = http.request(options, (proxyResponse) => {
    proxyResponse.on('data', data => {
      console.log(`Got data from proxy response: %s`, data);
      res.write(data, 'utf8')
    })

    proxyResponse.on('end', _ => {
      console.log('proxyResponse ended, sending responce to caller');
      res.end()
    })

    res.writeHead(proxyResponse.statusCode, proxyResponse.headers)
  });

  proxyRequest.on('data', _ => console.log(`proxyRequest got data`))

  req.on('data', data => {
    console.log(`Got data from browser: %s`, data);
    proxyRequest.write(data);
  })

  req.on('end', _ => {
    console.log('Caller request ended');
    proxyRequest.end();
  })
});

server.on('listening', () => console.log(`Server up and running on ${port} port`));
server.listen(port);