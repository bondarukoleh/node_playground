const app = require('express')()
const {ReadStream} = require('../stream/readStreamClass')

const port = 4000;
const readStream = new ReadStream({pushCounts: 10})

app.get('/', (req, res) => {
  readStream.pipe(res)
})
app.listen(port, () => console.log(`Server up and running on: ${port}`));