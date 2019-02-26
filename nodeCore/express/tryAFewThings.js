const app = require('express')()

app.on('hello', () => {
  console.log('Hello is called');
})

app.get('/', (req, res) => {
  res.app.emit('hello');
  res.send('answer to hello!')
})

app.listen(2000, () => console.log('Server up!'))