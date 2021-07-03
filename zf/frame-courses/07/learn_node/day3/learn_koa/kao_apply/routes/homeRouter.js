let Router = require('koa-router')

let router = new Router()

// router.get('/', async (ctx) => {
//   ctx.body = 'home'
// })
router.get('/list', async (ctx) => {
  let user_key = ctx.cookies.get('zf_user_key', {
    signed: true
  })
  console.log(user_key)
  ctx.body = 'home/list'
})
// router.get('/add', async (ctx) => {
//   ctx.body = 'home/add'
// })
router.post('/login', async ctx => {
  ctx.cookies.set('zf_user_key', "zhufeng", {
    maxAge: 10 * 60 * 1000,
    signed: true  // 需要配合一个密钥(在app上设置一个keys属性)使用
  })
  ctx.body = {
    msg: '登录陈工'
  }
})

module.exports = router