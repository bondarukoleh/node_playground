const assert = require('assert');
const http = require('http');

const request = function (path) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:4000${path}`, (res) => {
      res.body = '';
      res.on('data', (data) => {
        res.body += data;
      })
      res.on('end', _ => {
        resolve(res)
      })
      res.on('error', (err) => {
        reject(err)
      })
    })
  })
}


describe('Example web app', () => {
  it('should square numbers', async () => {
    const response = await request('/square/4')
    const expected = 16;
    assert.equal(response.statusCode, 200);
    assert.equal(response.body, expected, `${response.body} should be - ${expected}`);
  });
  it('should return a 500 for invalid square requests', async () => {
    const response = await request('/square')
    const expectedStatus = 500;
    assert.equal(response.statusCode, expectedStatus,
      `Status ${response.statusCode} should be - ${expectedStatus}`);
  });
});