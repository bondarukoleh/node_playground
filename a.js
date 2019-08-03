const querystring = require('querystring');
const koaBodyparser = require('koa-bodyparser');
const url = require('url');
const port = 3000;
const okStatus = {status: 'OK'};
const pathToEventMessages = path.join(__dirname, './eventMessages.json');
const {formEventMessageBody, OrderEvents, OrderStatus} = require('./test.data');
const {request} = require('./test.helpers');

describe('Test subscription mock service', () => {

  it('Check {status: "OK"} response', async () => {


  });


});


const options = (method = 'POST', p = '/subscription_mock') => {
  const opts = {
    method: method,
    port: 3000,
    host: '172.29.220.21',
    path: p,
    headers: {
      'x-client': 'asdfasdfaeafweawefaea232',
      'uuid': 'asdfaefda8ds09f70a9ef9',
      'Content-Type': 'application/json'
    }
  };
  return opts;
};


const postUpdate = () => {
  const req = http.request(options(), (res) => {
    const {statusCode} = res;
    console.log(`STATUS OF RESPONSE ${statusCode}`);
    res.on('data', (data) => {
      console.log('GOT DATA FROM SERVER');
      console.log(data.toString());
    });
  });
  req.write(JSON.stringify(orderUpdatedBody));
  req.end();
  req.on('error', function (e) {
    console.log('ERROR DURING REQUEST');
    console.error(e);
  });
};

const postCreate = () => {
  const req = http.request(options(), (res) => {
    const {statusCode} = res;
    console.log(`STATUS OF RESPONSE ${statusCode}`);
    res.on('data', (data) => {
      console.log('GOT DATA FROM SERVER');
      console.log(data.toString());
    });
  });
  req.write(JSON.stringify(orderCreatedBody));
  req.end();
  req.on('error', function (e) {
    console.log('ERROR DURING REQUEST');
    console.error(e);
  });
};

const getMessages = () => {
  const query = url.format({
    protocol: 'http',
    hostname: '172.29.220.21',
    pathname: '/events_by_organization_id',
    query: {
      sellerOrganizationId: 'sdfliu0897-asdfd789-asdlfjhl8'
    },
    port: 3000
  });
  console.log('QUERY')
  console.log(query)

  const req = http.get(options('GET', query), (res) => {
    const {statusCode} = res;
    console.log(`STATUS OF RESPONSE ${statusCode}`);
    res.on('data', (data) => {
      console.log('GOT DATA FROM SERVER');
      console.log(data.toString());
    });
  });
  req.end();
  req.on('error', function (e) {
    console.log('ERROR DURING REQUEST');
    console.error(e);
  });
};

setTimeout(postUpdate, 4000);
setTimeout(postCreate, 2000);
setTimeout(postCreate, 3000);
setTimeout(postCreate, 3000);
setTimeout(getMessages, 5000);
