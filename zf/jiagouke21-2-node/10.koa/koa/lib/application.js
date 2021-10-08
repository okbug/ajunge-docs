const EventEmitter = require('events');
const http = require('http');
const context = require('./context');
const request = require('./request');
const response = require('./response');
const Stream = require('stream')
class Koa extends EventEmitter {
    constructor() {
        super();
        // 保证应用之间互不干扰，否则多个应用共享一个上下文，可能会混乱
        this.context = Object.create(context); // this.context.__proto__ = context
        this.request = Object.create(request);
        this.response = Object.create(response);
        this.middlewares = []
    }
    use(middleware) {
        this.middlewares.push(middleware)
    }
    createContext(req, res) {
        // 多个请求共享了同一个上下文, 我需要没次请求的时候的上下文，请求对象和响应对象应该是独立
        let ctx = Object.create(this.context); // ctx.__proto__.__proto__ = context
        let request = Object.create(this.request);
        let response = Object.create(this.response);

        ctx.request = request; // request.xxx 都是封装的
        ctx.req = ctx.request.req = req; // req.xxx 就是原生的
        ctx.response = response;
        ctx.res = ctx.response.res = res;
        return ctx
    }
    compose(ctx) {
        // 我需要将middlewares 中的 所有的方法拿出来，先调用第一个，第一个调用完毕后，会调用next ，再去执行第二个
        let index = -1;
        const dispatch = (i) => { // reduce 也可实现
            console.log(index,'---',i)
            if(i <= index) return Promise.reject('next() called multiple times');
            index = i;
            if (this.middlewares.length == i) return Promise.resolve();
            return this.middlewares[i](ctx, () => dispatch(i + 1))
        }
        return dispatch(0);
    }
    handleRequest = (req, res) => {
        const ctx = this.createContext(req, res)
        res.statusCode = 404;
        // this.fn(ctx); // 原生的req和res 能处理功能，但是太弱了

        console.log(this.compose(ctx))
        this.compose(ctx).then(() => {
            if(ctx.body instanceof Stream){
                ctx.body.pipe(res);
            }else  if (typeof ctx.body === 'object') {
                res.setHeader('Content-Type', 'application/json;charset=utf-8')
                res.end(JSON.stringify(ctx.body))
            } else if (ctx.body) {
                res.end(ctx.body);
            } else {
                res.end('Not Found')
            }
        }).catch(err=>{
            this.emit('error',err)
        })

    }
    listen(...args) {
        // node 中http模块
        const server = http.createServer(this.handleRequest);
        server.listen(...args);
    }
}

function fn(){
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve()
        }, 1000);
    })
}
function a(){
    return fn()
}
Promise.resolve(a()).then(data=>{
    
});
module.exports = Koa