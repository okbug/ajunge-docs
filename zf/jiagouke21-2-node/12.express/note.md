## Express 和 Koa的对比
- express 处理请求的时候全部采用的回调函数的方式 koa 采用的是promise + async +await
- express 内部采用的是ES5语法 koa采用的是es6 来编写的
- express 比 koa功能多 多了一些内置的中间件（路由，静态服务，模板渲染）代码体积比koa多
- koa中为了扩展采用的是ctx扩展了 request,response对象,express 直接在原生的req和res的基础上进行了扩展
- express 中的特点内部采用的是回调 （组合 它内部不支持promise串联） koa支持promise串联



