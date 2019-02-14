const assert = require('assert');

const square = num => Math.pow(num, 2);
const async1 = _ => new Promise(res => setTimeout(res, 500, 1));


describe(`Super math operations`, () => {
  it(`Should square result`, () => {
    const expected = 4;
    const actual = square(2);

    assert.equal(actual, expected, `${actual} should be - ${expected}`)
  })

  it(`Async concat with mocha done`, (done) => {
    const expected = 2;

    async1()
      .then(value => {
        const actual = value + 1;
        assert.equal(actual, expected, `${actual} should be - ${expected}`)
        done();
      })
      .catch(err => {
        console.log('2');
        console.log(`Got error: ${err}`);
        done(err);
      })    
  })

  it(`Async concat with async/await`, async () => {
    const expected = 2;
    const value = await async1();
    const actual = value + 1;
    assert.equal(actual, expected, `${actual} should be - ${expected}`)    
  })
})

