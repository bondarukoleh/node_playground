const fs = require('fs');

const files = fs.readdir(__dirname, (err, data) => {
  console.log(data)
})
console.log(files)