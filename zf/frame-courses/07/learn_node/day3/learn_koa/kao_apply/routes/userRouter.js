let Router = require('koa-router')

let router = new Router({
  prefix: '/user'
})

router.get('/', async (ctx) => {
  ctx.body = 'user'
})
router.get('/list', async (ctx) => {
  ctx.body = 'user/list'
})
router.get('/add', async (ctx) => {
  ctx.body = 'user/add'
})




module.exports = router