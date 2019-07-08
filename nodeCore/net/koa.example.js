const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const bodyParser = require('koa-bodyparser');
const url = require('url');

const port = 3000;
const okStatus = {status: 'OK'};
const pathToEventMessages = path.join(__dirname, './eventMessages.json');
const createEventsStorage = () => {
  try { // to discuss: do we need clear event storage each time?
    fs.writeFileSync(pathToEventMessages, JSON.stringify([]))
  } catch (e) {
    console.log('Attempt to read/create subscription events storage in mock service. Error appeared!');
    app.onerror(e)
  }
};

const Router = require('koa-router');
const Koa = require('koa2');

const app = new Koa();
const router = new Router();
app.use(bodyParser());


router.get('/subscription_mock', (ctx) => {
  console.log('Got request');
  ctx.body = JSON.stringify(okStatus);
});

router.post('/event_storage', async (ctx) => {
  const {body: requestBody} = ctx.request;
  const eventMessages = require(pathToEventMessages);
  eventMessages.push({headers: ctx.headers, body: requestBody});
  fs.writeFileSync(pathToEventMessages, JSON.stringify(eventMessages));
  ctx.body = requestBody;
  return ctx
});

router.get('/events', async (ctx) => {
  ctx.body = require(pathToEventMessages);
  return ctx
});

router.get('/events_by_organization_id', async (ctx) => {
  const events = require(pathToEventMessages);

  const parsedByUrl = url.parse(ctx.request.url);
  const {sellerOrganizationId: passedOrganizationId} = querystring.parse(parsedByUrl.query);

  ctx.body = events.filter(({body: {payload}}) => payload.sellerOrganizationId === passedOrganizationId);
  return ctx
});

router.get('/events_by_order_line_Id', async (ctx) => {
  const events = require(pathToEventMessages);

  const parsedByUrl = url.parse(ctx.request.url);
  const {orderLineId: passedOrderLineId} = querystring.parse(parsedByUrl.query);

  ctx.body = events.filter(({body: {payload}}) => payload.orderLineId === passedOrderLineId);
  return ctx
});

router.get('/events_by_name', async (ctx) => {
  const events = require(pathToEventMessages);

  const parsedByUrl = url.parse(ctx.request.url);
  const {event: passedEventName} = querystring.parse(parsedByUrl.query);

  ctx.body = events.filter(({body}) => body.event === passedEventName);
  return ctx
});

app.use(router.routes());
app.listen(port, () => {
  console.log(`Subscription events mock service running on ${port} port.`);
  createEventsStorage()
});

process.on('uncaughtException', (err) => {
  console.log('Got uncaught.');
  app.onerror(err)
})
