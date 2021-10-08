const express = require('./express');
const app = express();

// 路由的中间件功能 
// 例如 当我访问/ 的时候需要判断用户权限，如果是某个权限做某件事 -》 最终相应结果


// app.route('/').post(function(req,res){
//     res.end('post')
// }).get(function(req,res){
//     res.end('get')
// })
app.get('/', function(req, res, next) {
        console.log(1);
        next();
        console.log('5')

}, function(req, res, next) {
    setTimeout(() => {
        console.log(2);
        next();
        console.log('6')
    }, 1000);
})
app.get('/', function(req, res, next) {
    console.log(4);
    res.end('ok')
})
app.post('/', function(req, res, next) {
    console.log(4);
    res.end('ok post')
})
app.listen(3000)