require('./connection')();

const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa2-cors');

const index = require('./controller');

const app = new Koa();

app.use(cors());

const router = new Router();

router.all('/api/params', index.search);

app.use(router.routes());

app.listen(3000);
console.log('port 3000 start!')

