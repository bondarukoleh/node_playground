const fs = require('fs');

fs.readdir(__dirname, (err, data) => {
  console.log(data)
})
