const assert = require('assert');


const it = function(name, test){
  let err = null;

  try{
    test()
  } catch (e) {
    err = e;
  }

  console.log(`It ${name} - `, err ? `failed!` : `passed!`);

  if(err) {
    console.log(err.name);
    console.log(err.message);
  }
}

it(`should always pass`, () => {
  assert.equal(true, true, `True should be true`);
})

it(`should always fail`, () => {
  assert.equal(true, false, `True should be true`);
})

it(`should fail`, () => {
  require('fs').readFileSync('NotExisting');
})