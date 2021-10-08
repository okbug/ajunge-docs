const fs = require('fs');
const path = require('path');
module.exports = function(app){
    // app.use(async (ctx, next) => {
    //     if (ctx.path === '/form' && ctx.method == 'GET') {
    //         // koa 中默认返回一个流 他会认为是要下载这个文件
    //         ctx.set('Content-Type', 'text/html;charset=utf-8')
    //         ctx.body = fs.createReadStream(path.resolve(__dirname, 'form.html'))
    //     } else {
    //         await next()
    //     }
    // });
    
    // 中间件会组合成一个大的promise,第一个完成了就完成了。 使用koa所有的异步方法都要包装成promise
    app.use(async (ctx, next) => {
        if (ctx.path === '/login' && ctx.method == 'POST') {
            ctx.body = await ctx.request.body
        } else {
            next();
        }
    })

}