const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    if (req.url === '/getIndex') {
        fs.createReadStream(`${__dirname}/streamInfo.js`).pipe(res)
    }
}).listen(3000);
