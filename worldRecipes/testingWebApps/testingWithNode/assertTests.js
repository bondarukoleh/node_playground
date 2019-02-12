const assert = require('assert');
const fs = require('fs');

const toJson = obj => JSON.stringify(obj);

{
  const square = num => Math.pow(num, 2);
  const expected = 4;

  assert(square(1), `Function should return a value`);
  assert.ok(square(1), `Function should return a value`);
  assert.equal(square(2), expected, `Number: ${square(2)} should be: ${expected}`);
}

{
  const actual = { a: 1, b: { a: 1 } };
  const expected = { a: 1, b: { a: 1 } };
  assert.deepEqual(actual, expected, `Object: ${toJson(actual)} should equal: ${toJson(expected)}`);
}

{
  const actual = [1, 2];
  const expected = [1, 2];
  assert.deepEqual(actual, expected, `Array: ${toJson(actual)} should equal: ${toJson(expected)}`);
}

{
  function readConfig(cb){
    fs.readFile('error.conf', (err, data) => {
      if(err && err.code === 'ENOENT') {
        return cb(err)
      }
      console.log('Config found');
      cb(null, data);
    })
  }

  /* readConfig((err, data) => {
    assert.ifError(err) // If err - than throw an error
  }) */
}

{
  assert.throws(
    function() {throw new ReferenceError('Some ReferenceError')},
    ReferenceError,
    `Should throw ReferenceError`
  )
}

{
  function myMatch(actual, regex, message){
    if(!actual.match(regex)){
      assert.fail(actual, regex, message, 'myMatch', assert.match)
    }
  }
  assert.match = myMatch; // CHANGING BUILD IN FUNCTION

  assert.match('Oleh', /Oleh/, 'Oleh', `Name should be Oleh`);

  assert.throws(
    function(){
      assert.match('Pavel', /Oleh/, 'Oleh', `Name should be Oleh`)
    },
    assert.AssertionError,
    `Should return AssertionError from my custom matcher`
  )
}
