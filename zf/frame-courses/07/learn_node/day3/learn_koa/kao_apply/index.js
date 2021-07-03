let Koa = require('koa');
let router = require('./routes/index')
let static = require('koa-static')
let path = require('path')
let app = new Koa();
app.listen(3000)
console.log(path.resolve(__dirname, '../public'))
app.use(static(path.resolve(__dirname, '../public')))
app.keys = ['hahah', 'gege', 'rrrr'] // 密钥
app.use(router())


// koa   koa-static   koa-router  koa-combine-routers