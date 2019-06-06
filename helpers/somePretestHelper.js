console.log('This is pretest required by mocha');

console.log('Variables:');
console.log(`process.env.REPORTER: ${process.env.REPORTER}`);
console.log(`process.env.MOCHA_OPTS: ${process.env.MOCHA_OPTS}`);
console.log(`process.env.SPECS: ${process.env.SPECS}`);

(async () => {
  await new Promise((res) => setTimeout(() => {
    console.log('ASYNC WORK FROM -r DONE');
    res()
  }, 3000))
})()
