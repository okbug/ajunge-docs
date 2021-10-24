# express基本用法

```js
const express = require('express');

const app = express(); // 作为函数执行，返回一个对象

app.get('/test', (req, res, next) => { // 注册路由，并且有中间件，多个一起使用
    next(); // next就是第二个函数，按照当前顺序执行的话，就是打印 [2 1]
    console.log(1);
    
    res.end('111')
})

app.get('/test', (req, res, next) => {
    console.log(2);
})


app.listen(3000, () => {
    console.log('3000'); // 建立一个服务
})
```