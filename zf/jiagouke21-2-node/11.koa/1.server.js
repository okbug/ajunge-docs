const Koa = require('koa');
const app = new Koa();
const login = require('./login')
const path = require('path');
// const static = require('koa-static');
// const bodyParser = require('koa-bodyparser')
const bodyParser = require('./middleware/bodyparser'); // koa官方提供了一些现成的第三方模块
const static = require('./middleware/static');
const Router = require('./middleware/router')
// const Router = require('koa-router');
const router = new Router();
// 默认我访问 /form 我就显示给用户一个表单，用户可以填写后提交过来，我们需要去解析用户的参数
// 中间件的作用 可以给koa中的属性扩展功能和方法, 可以做一些鉴权相关的
app.use(bodyParser({dir:path.resolve(__dirname,'upload')}))
app.use(static(__dirname));
app.use(static(path.resolve(__dirname,'middleware')));
login(app);
router.get('/login',async(ctx,next)=>{
    console.log('login-1');
    await next();
})
router.get('/login',async(ctx,next)=>{
    console.log('login-2')
    next()
})
router.post('/login',async(ctx,next)=>{
    console.log('login-post')
    next();
})
app.use(router.routes()); // 中间件的执行顺序是从上到下
app.use(async(ctx)=>{
    ctx.body = 'all'
})
app.listen(3000, function() {
    console.log(`server start 3000 `)
})