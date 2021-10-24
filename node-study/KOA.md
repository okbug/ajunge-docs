# 基本用法

```js
const Koa = require('koa');

const app = new Koa();

app.use('/', (ctx) => {
    ctx.body = 'Hello text';
})

app.listen(3000, () => {
    console.log(3000);
})
```


# ctx是啥
ctx是koa自己封装的一个对象，内部包含了原生http包中的 `req,res` 等方法
也有 `request, response` 等koa中自己实现的方法
request中有path等新方法，也可以通过 `request.req` 获取到原生req
ctx也可以做到req `ctx.url === ctx.req.url`

所以，在内部实现是这样
```js
function createContext(req, res) { // 传入的是原生http模块的req和res，这个方法用来创建上下文
    // 这里先不考虑不同应用和不同上下文环境，不使用Object.create
    const ctx = this.context;
    const request = this.request;
    const response = this.response;
    ctx.req = req;
    ctx.res = res;
    ctx.request = request;
    ctx.response = response;
    ctx.request.req = req;
    ctx.response.res = res;
    return ctx; // 这个就是创建好的上下文
}
```

### 为什么需要Object.create？
因为一个Koa实例可能往ctx传一些东西，执行多次后防止变量污染，所以不能同一个对象。
并且this.request等对象也在初始化的时候使用Object.create拷贝一次，这是为了防止不同应用间的变量污染
