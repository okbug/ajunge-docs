const http = require('http');

const Router = require('./router')
// 应用的功能 就是提供监听方法，收集路由。 应用中耦合了路由系统

function Application() {
    this.router = new Router();
    // this._routers = [{
    //     method: 'all',
    //     path: '*',
    //     handler(req, res) {
    //         res.end(`Cannot ${req.method} ${req.url}`)
    //     }
    // }];
}
Application.prototype.get = function(path, handler) {
    // this._routers.push({
    //     path,
    //     method:'get',
    //     handler
    // })
    this.router.get(path,handler)
}
Application.prototype.listen = function(...args) {
    const server = http.createServer((req, res) => {
        // for (let i = 1; i < this._routers.length; i++) {
        //     let { method, path, handler } = this._routers[i];
        //     if (pathname == path && method === requestMethod) {
        //         return handler(req, res)
        //     }
        // }
        // return this._routers[0].handler(req, res)
        function done(){
            res.end(`Cannot ${req.method} ${req.url}`)
        }
        this.router.handle(req,res,done)
    });
    server.listen(...args)
}

module.exports = Application