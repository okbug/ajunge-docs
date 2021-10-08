const Koa = require('./koa');  // 我的
// const Koa = require('koa'); 
// 通过new的方式创建一个应用
const app  = new Koa(); // const server =  createServer(function(){})
// 以前使用http模块 需要通过判断 req.url 来进行对应的处理

// 为什么koa出现，原因在于 req，和res 他的功能非常弱 , 增强 req和 res， 自己生成了两个对象 request 另一个叫response  => ctx
// 有自己的中间件机制 
// 错误处理
app.use((ctx)=>{
    //console.log(ctx.req.url); // 原生的
    //console.log(ctx.request.req.url); // koa上自己封装的request上是有req属性的, 这个地方在request上增加req属性的目的是 在request对象中可以通过this 获取到req

    //console.log(ctx.request.query); // koa封装的
    //console.log(ctx.query); // ctx.query => ctx.request.query
    // res.end('hello world'); // 响应结果
    // ctx.body = 'hello' // res.end()
    // ctx.response.body = 'world'
    ctx.body =  {a:1}
    console.log(ctx.body)
})

app.listen(3000,function(){
    console.log(`server start 3000`);
}) ; // server.listen

app.on('error',function (err) {
    console.log('err',err)
})