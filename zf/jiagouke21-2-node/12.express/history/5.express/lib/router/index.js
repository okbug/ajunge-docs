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
Router.prototype.use = function(path) {
    let args = Array.from(arguments);
    let handlers = [];
    if (typeof path === 'function') {
        path = '/';
        handlers = [...args]
    } else {
        handlers = args.slice(1)
    }
    handlers.forEach(handler => {
        let layer = new Layer(path, handler);
        layer.route = undefined; // 后面判断 如果layer上有route属性 说明是路由，没有说明是中间件
        this.stack.push(layer);
    })
}
methods.forEach(method => {
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
    const next = (err) => {
        if (i == this.stack.length) return done(); // 整个栈都筛了一遍没有找到，交给应用来处理
        let layer = this.stack[i++];
        if (err) {
            // 如果有错误就在栈中查找错误处理中间件，不是错误处理中间件的就不要执行了
            if (!layer.route) { 
                if(layer.handler.length === 4){
                    layer.handler(err,req,res,next);
                }else{
                    next(err); // 正常的中间件
                }
            }else{
                next(err); // 路由
            }
        } else {
            // 无论路由还是中间件 都得匹配路径，但是中间件不匹配方法
            if (layer.match(pathname)) { // layer种用来管理自己的匹配逻辑 layer.parmas
                req.params = layer.params;
                if (!layer.route) { // 中间件不需要匹配方法
                    if(layer.handler.length === 4){ // 如果正常情况下是不执行错误处理中间件的
                        next();
                    }else{
                        layer.handle_request(req, res, next)
                    }
                } else { // 路由需要匹配方法，在执行
                    if (layer.route.methods[method]) {
                        layer.handle_request(req, res, next); // route.dispatch
                    } else {
                        next();
                    }
                }
            } else {
                next();
            }
        }



    }
    next();
}
module.exports = Router

// 35 继续