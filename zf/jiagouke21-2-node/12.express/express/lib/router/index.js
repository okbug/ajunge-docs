const url = require('url');
const Layer = require('./layer');
const Route = require('./route');
const methods = require('methods');

function Router() {
    let router = function(req, res, next) {
        // 当请求到来时 我该干什么?
        router.handle(req, res, next); // 请求来了从栈中匹配即可
    }
    router.stack = [];
    router.events = {};
    router.__proto__ = proto; // 能new 能执行，new的时候返回的是这个函数,执行的时候返回的也是这个函数
    return router
}
let proto = {};
proto.route = function(path) {
    let route = new Route();
    let layer = new Layer(path, route.dispatch.bind(route));
    layer.route = route;

    this.stack.push(layer);

    return route;
}
proto.use = function(path) {
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
    proto[method] = function(path, handlers) { // 像路由的stack中添加
        if (!Array.isArray(handlers)) {
            handlers = Array.from(arguments).slice(1)
        }
        let route = this.route(path); // 创建route，并返回route
        route[method](handlers)
    }
})

proto.param = function(key, callback) { // {id:[],name:[]}
    if (this.events[key]) {
        this.events[key].push(callback);
    } else {
        this.events[key] = [callback]
    }
}
proto.handle_params = function(req, res, layer, out) {
    let keys = layer.keys;
    if (!keys || !keys.length) return out();
    keys = keys.reduce((memo, current) => [...memo, current.name], []);
    let events = this.events;
    let i = 0;
    let index = 0;
    let key;
    let fns;
    const next = () => {
        if (keys.length === i) return out()
        key = keys[i++]
        fns = events[key]; // {id:[fn1,fn2],name:[fn1,fn2]}
        if (fns) {
            processCallback();
        } else {
            next();
        }
    }
    next();
    function processCallback() {
        let fn = fns[index++];
        if (fn) {
            fn(req, res, processCallback, layer.params[key], key)
        } else {
            index = 0;
            next(); // 如果到头了 就执行洗衣歌
        }
    }
}

proto.handle = function(req, res, done) {
    // 要在路由的栈种查找 ，找不到就找下一个，找到了将下一个的执行权限传递进去
    const { pathname } = url.parse(req.url);
    const method = req.method.toLowerCase();
    let i = 0
    let removed = ''
    const next = (err) => {
        if (i == this.stack.length) return done(); // 整个栈都筛了一遍没有找到，交给应用来处理
        let layer = this.stack[i++];
        if (removed.length) {
            req.url = removed + req.url;
            removed = ''; // 从next方法出来的时候 需要增添前缀
        }
        if (err) {
            // 如果有错误就在栈中查找错误处理中间件，不是错误处理中间件的就不要执行了
            if (!layer.route) {
                if (layer.handler.length === 4) {
                    layer.handler(err, req, res, next);
                } else {
                    next(err); // 正常的中间件
                }
            } else {
                next(err); // 路由
            }
        } else {
            // 无论路由还是中间件 都得匹配路径，但是中间件不匹配方法
            if (layer.match(pathname)) { // layer种用来管理自己的匹配逻辑 layer.parmas
                req.params = layer.params;
                if (!layer.route) { // 中间件不需要匹配方法
                    if (layer.handler.length === 4) { // 如果正常情况下是不执行错误处理中间件的
                        next();
                    } else {
                        // 匹配到中间件的时候 需要删除中间件的前缀 （如果中间件是/ 就不用删除）
                        if (layer.path !== '/') {
                            removed = layer.path;
                            req.url = req.url.slice(removed.length); // 删除前缀，重新赋值给req.url,当进入到里层的时候 拿到的就是去掉后的
                        }

                        layer.handle_request(req, res, next)
                    }
                } else { // 路由需要匹配方法，在执行
                    if (layer.route.methods[method]) {
                        // 如果没有参数处理 直接执行这个 handleRequest
                        this.handle_params(req, res, layer, () => { // 如果处理完成真正的进行响应
                            layer.handle_request(req, res, next); // route.dispatch
                        })

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