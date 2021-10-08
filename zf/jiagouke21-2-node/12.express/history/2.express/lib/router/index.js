const url = require('url');
const Layer = require('./layer');
const Route = require('./route');

function Router() {
    this.stack = [];
}
Router.prototype.route = function(path) {
    let route = new Route();
    let layer = new Layer(path, route.dispatch.bind(route));
    layer.route = route;
    
    this.stack.push(layer);

    return route;
}
Router.prototype.get = function(path, handlers) { // 像路由的stack中添加
    let route = this.route(path); // 创建route，并返回route
    route.get(handlers)
    // 要创建一个layer 还要创建一个route  要将layer.route = route
    // this.stack.push({
    //     path,
    //     method: 'get',
    //     handler
    // })
}
Router.prototype.handle = function(req, res, done) { // 请求到来时，会匹配对应的路由
    // let { pathname, query } = url.parse(req.url, true);
    // let requestMethod = req.method.toLowerCase();
    // for (let i = 0; i < this.stack.length; i++) {
    //     let { path, method, handler } = this.stack[i];
    //     if (pathname === path && method === requestMethod) {
    //         return handler(req, res);
    //     }
    // }
    // done(); // 如果找不到调用应用提供的done方法
}
module.exports = Router

// 35 继续