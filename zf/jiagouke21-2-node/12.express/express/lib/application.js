const http = require('http');
const methods = require('methods'); // 第三方模块，别人提供好的 我安装了express
const fs = require('fs')
const Router = require('./router'); // 引入了路由系统
function Application() { // 每个应用默认创建一个路由系统, 有可能人家是用应用，不用路由系统
    // this.router = new Router();
}
Application.prototype.lazy_route = function(){
    if(!this.router){
        this.router = new Router();
        this.use((req, res, next) => {
            res.send = function(data) {
                if (typeof data == 'object') {
                    res.end(JSON.stringify(data))
                } else if (typeof data == 'string' || Buffer.isBuffer(data)) {
                    res.end(data)
                }
            }
            res.sendFile = function(filePath){
                fs.createReadStream(filePath).pipe(res);
            }
            next();
        })
    }
}
Application.prototype.param = function(){
    this.lazy_route();
    this.router.param(...arguments);
}
methods.forEach(method => {
    Application.prototype[method] = function(path, ...handlers) { // app.get()
        this.lazy_route();
        this.router[method](path, handlers); // 像路由系统中添加
    }
})
Application.prototype.use = function(){
    this.lazy_route();
    this.router.use(...arguments)
}
Application.prototype.listen = function(...args) { // app.listen()
    const server = http.createServer((req, res) => {
        function done() {
            res.end(`Cannot ${req.method} ${req.url}`)
        }
        this.lazy_route();
        this.router.handle(req, res, done); // 交给路由系统来处理,路由系统处理不了会调用done方法
    });
    server.listen(...args)
}
module.exports = Application


// 应用的路由懒加载， 路由的匹配（外层要匹配路径和粗略看一下route中是否有此方法，有了在调用dispatch，没有跳过执行后续逻辑）