const app = require('express')()

const port = 4000;

app.get('/', (req, res) => {
  res.send('Hello')
})
app.listen(port, () => console.log(`Server up and running on: ${port}`));