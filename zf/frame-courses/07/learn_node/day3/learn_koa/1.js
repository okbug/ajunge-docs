let Koa = require('koa')
let static = require('koa-static'); // 静态服务插件 
let Router = require('koa-router');
let router = new Router()
let app = new Koa()
app.listen(3000, function () {
  console.log('服务起于3000')
})
app.use(async (ctx, next) => {
  // request  response  KOA封装的请求信息和响应信息
  //req  res 原生的请求信息和响应信息
  ctx.qqq = 123;
  await next()
})

app.use(static('../public'))

// app.use(async (ctx, next) => {
//   ctx.body = 'Hello World';
//   console.log(ctx.qqq)
//   await next()
// });
// app.use(async (ctx, next) => {
//   console.log(666)
// })

app.use(router.routes())

// 创造了一个  /list的接口 需要时 get请求
router.get('/list', async (ctx) => {
  // ctx.body = 'list接口'
  // ctx.body = [1, 23, 4, 56, 67, 8, 8]
  ctx.body = {
    q: 123,
    w: 345
  }
})
router.post('/login', async (ctx) => {
  ctx.body = {
    code: 0
  }
})
// router.get('/login', async (ctx) => {
//   ctx.body = {
//     code: 0
//   }
// })