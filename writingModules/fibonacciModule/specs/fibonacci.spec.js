const { expect } = require('chai');
const assert = require('assert')
const {tailFib, recurciveFib} = require('../index.js')
const Banchmark = require('benchmark');

describe('Test Fibonacci functions', () => {
  it('Should return correct fibonacci number from recursive function', async () => {
    const expected = 2;
    const actual = recurciveFib(3);
    expect(expected).to.eq(actual, `Fibonachi function result should be: ${expected}, got: ${actual}`);
    assert.equal(recurciveFib(0), 0);
    assert.equal(recurciveFib(1), 1);
    assert.equal(recurciveFib(2), 1);
    assert.equal(recurciveFib(3), 2);
    assert.equal(recurciveFib(4), 3);
    assert.equal(recurciveFib(5), 5);
    assert.equal(recurciveFib(6), 8);
    assert.equal(recurciveFib(7), 13);
    assert.equal(recurciveFib(8), 21);
    assert.equal(recurciveFib(9), 34);
    assert.equal(recurciveFib(10), 55);
    assert.equal(recurciveFib(11), 89);
    assert.equal(recurciveFib(12), 144);
  })

  it(`Should benchmark fibonacci tail module`, () => {
    const suite = new Banchmark.Suite;
    suite.add('pass a 12 in fibonacci tail module', () => tailFib(20))
      .add('pass a 13 in fibonacci tail module', () => tailFib(30))
      .on('cycle', function (event) {
        console.log(String(event.target));
      })
      .on('complete', function () {
        const result = this.filter('fastests')
        console.log('Fastest is ' + this.filter('fastest').map('name'));
        console.log(result);
      })
      .run({ 'async': true });
  })

  it(`Should benchmark fibonacci recursive module`, () => {
    const suite = new Banchmark.Suite;
    suite
      .add('pass a 12 in iter fibonacci module', function () {
        recurciveFib(10)
      })
      .add('pass a 13 in iter fibonacci module', function () {
        recurciveFib(20)
      })
      // add listeners
      .on('cycle', function (event) {
        console.log(String(event.target));
      })
      .on('complete', function () {
        const result = this.filter('fastests')
        console.log('Fastest is ' + this.filter('fastest').map('name'));
        console.log(result);
      })
      .run({ 'async': true });
  })
})