const url = require('url');
const Layer = require('./layer');
const Route = require('./route');
const methods = require('methods');

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
methods.forEach(method=>{
    Router.prototype[method] = function(path, handlers) { // 像路由的stack中添加
        let route = this.route(path); // 创建route，并返回route
        route[method](handlers)
    }
})

Router.prototype.handle = function(req, res, done) {
    // 要在路由的栈种查找 ，找不到就找下一个，找到了将下一个的执行权限传递进去
    const { pathname } = url.parse(req.url);
    const method = req.method.toLowerCase();
    let i = 0
    const next = () =>{ 
        if(i == this.stack.length) return done(); // 整个栈都筛了一遍没有找到，交给应用来处理
        let layer = this.stack[i++];
        if(layer.match(pathname)){ // layer种用来管理自己的匹配逻辑
            if(layer.route.methods[method]){
                layer.handle_request(req,res,next); // route.dispatch
            }else{
                next();
            }
        }else{
            next();
        }
    }
    next();
}
module.exports = Router

// 35 继续