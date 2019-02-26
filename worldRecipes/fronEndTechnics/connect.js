const connect = require('connect');
const serveStatic = require('serve-static');
const path = require('path');
const dataPath = path.resolve(__dirname, '../../nodeCore/data')
const app = connect();

// Simple static file server. Get file (only file) -> http://localhost:4000/testFolder/1.txt
app.use(serveStatic(dataPath)).listen(4000);
