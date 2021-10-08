const Koa = require('./koa');
const fs =require('fs')
const app = new Koa();
const sleep = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('sleep')
            resolve();
        }, time);
    })
}
// koa 会将多个中间件进行组合处理 ，内部会将这三个函数全部包装成promise，并且将这三个promise串联起来，内部会使用promise连接起来， 这里第一个use执行完成就整个完成了

// koa 的使用 await 或者next 前边必须加 return  、 await 这样才会有等待效果
// 必须要保证下面的promise完成，所以必须增加await，否则下面没执行完毕，就直接继续后面的逻辑了



app.use((ctx, next) => {
    // ctx.body =  fs.createReadStream(require('path').resolve(__dirname,'package.json'))
    ctx.body = 'xxx'
    return next()
    // await next()
})
app.use( (ctx, next) => {
    ctx.body = 'three'
    // return sleep(2000);
    ctx.body = 'four'
})
app.use(  (ctx, next) => {
    ctx.body = 'five'
    ctx.body = 'sex'
})

app.listen(3000);

app.on('error',function(err){
    console.log(err)
})