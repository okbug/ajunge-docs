const express = require('./express');

// express 创建应用是通过 express()来创建的 
const app = express();
// express 解决了 原生http需要针对不同条件做处理 

// app.get('/', function(req, res) {
//     res.end('home')
// })
// app.get('/hello', function(req, res) {
//     res.end('hello');
// })
// app.listen(3000, function() {
//     console.log(`server start 3000`);
// })