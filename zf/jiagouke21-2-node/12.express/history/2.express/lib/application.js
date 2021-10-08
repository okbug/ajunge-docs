const http = require('http');

const Router = require('./router'); // 引入了路由系统

function Application() { // 每个应用默认创建一个路由系统
    this.router = new Router();
}
Application.prototype.get = function(path, ...handlers) { // app.get()
    this.router.get(path,handlers); // 像路由系统中添加
}
Application.prototype.listen = function(...args) { // app.listen()
    const server = http.createServer((req, res) => {
        function done(){
            res.end(`Cannot ${req.method} ${req.url}`)
        }
        this.router.handle(req,res,done); // 交给路由系统来处理,路由系统处理不了会调用done方法
    });
    server.listen(...args)
}
module.exports = Application