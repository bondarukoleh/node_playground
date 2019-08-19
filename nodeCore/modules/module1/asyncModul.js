const prom = new Promise((res) => {
  setTimeout((arg) => {
    console.log('ASYNC WORK DONE');
    res(arg);
  }, 5000, 'GOT FROM ASYNC MODULE')
})

async function af() {
  await prom;
  return 'OK'
}

module.exports = af()
