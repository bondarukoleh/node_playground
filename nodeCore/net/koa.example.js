const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const bodyParser = require('koa-bodyparser');
const url = require('url');
const cors = require('@koa/cors');

const port = 3000;
const pathToBackup = path.join(__dirname, './storageBackup.json');

const Router = require('koa-router');
const Koa = require('koa2');

const app = new Koa();
const router = new Router();
app.use(bodyParser());
app.use(cors());

router.get('/subscription_mock', (ctx) => {
  ctx.body = {status: 'OK'};
});

router.post('/subscription_mock', async (ctx) => {
  ctx.storage.push({headers: ctx.headers, body: ctx.request.body});
  ctx.body = ctx.request.body;
  ctx.status = 201;
});

router.get('/events', async (ctx) => {
  ctx.body = ctx.storage;
});

router.get('/events_by_organization_id', async (ctx) => {
  const parsedByUrl = url.parse(ctx.request.url);
  const {organizationId: passedOrganizationId} = querystring.parse(parsedByUrl.query);
  ctx.body = ctx.storage.filter(({body: {payload}}) => payload.sellerOrganizationId === passedOrganizationId);
});

router.get('/clear_storage', async (ctx) => {
  ctx.storage.length = 0;
  ctx.body = true;
});

router.get('/backup', async (ctx) => {
  try {
    ctx.body = JSON.parse(fs.readFileSync(pathToBackup));
  } catch (err) {
    ctx.app.emit('error', err, ctx);
  }
});

router.post('/backup', async (ctx) => {
  app.context.createBackUp(app, ctx);
  try {
    ctx.body = JSON.parse(fs.readFileSync(pathToBackup));
    ctx.status = 201;
  } catch (err) {
    ctx.app.emit('error', err, ctx);
  }
});

// Error handler responses with error on any call
app.on('error', (err, ctx) => {
  app.onerror(err);
  ctx.status = err.status || 500;
  ctx.body = {
    message: err.message
  };
  return ctx;
});

app.use(router.routes());
app.listen(port, () => {
  console.log(`Subscription events mock service running on ${port} port.`);
  // Creating storage when server is up
  app.context.storage = [];
  app.context.createBackUp = createStorageBackup;
  process.on('uncaughtException', (err) => {
    app.onerror(err);
    app.context.createBackUp(app)
  })
});

const createStorageBackup = (app, ctx) => {
  try {
    if (fs.existsSync(pathToBackup)) {
      let existingBackup = fs.readFileSync(pathToBackup);
      existingBackup = [...existingBackup, ...app.context.storage];
      fs.writeFileSync(pathToBackup, JSON.stringify(existingBackup))
    }
    fs.writeFileSync(pathToBackup, JSON.stringify(app.context.storage))
  } catch (err) {
    app.onerror(err);
    // If context is passed - then we need to response error.
    if(ctx) {
     ctx.app.emit('error', err, ctx)
    }
  }
};
