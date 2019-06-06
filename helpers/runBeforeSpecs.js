console.log('THIS IS RUN BEFORE TEST RUN');

(async () => {
  await new Promise((res) => setTimeout(() => {
    console.log('ASYNC WORK FROM --file DONE');
    res()
  }, 3000))
})()