// express 中间件, 
// express中的正则路由
// express 中的二级路由
// express 内置的其他中间件

const express = require('./express');
const app = express();

// 中间件, 可以决定是否向下执行，可以扩展方法和属性.一般还用作权限处理
app.use('/user',function(req,res,next){ // 拦截器
    console.log('user middleware');
    next();
},function(req,res,next){ // 拦截器
    console.log('user middleware');
    next();
})
app.get('/user',function(req,res){
    res.end('user')
})
app.get('/user/admin',function(req,res,next){
    next('router error')
    res.end('user admin')
})
app.get('/admin',function(req,res){
    res.end('admin')
})

app.use((error,req,res,next)=>{  // 错误处理中间件
    console.log(error);
    res.end(error)
})

app.listen(3000,function(){
    console.log('`server start 3000')
})