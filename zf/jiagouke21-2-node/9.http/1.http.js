const http = require('http'); // tcp net模块


// 发布订阅 ，客户端访问我时 底层net模块会接收消息，内部会派发对应的时间

// 底层可以通过net模块 来实现 http服务，net模块会对收到的信息进行解析 收到头，收到体 收到的状态码...

const server = http.createServer(function(req,res){
    // 看看http模块对于req 和 res的的封装
    // console.log(req.method); // 大写的
    // console.log(req.url); // 请求路径 
    // console.log(req.httpVersion);


    // console.log(req.headers); // 请求头 统一node处理后全部是小写的 
    // const arr = [];
    // req.on('data',function(data){
    //     arr.push(data)
    // })
    // req.on('end',function(data){
    //     console.log(Buffer.concat(arr).toString());
    // }); 

    // --------------请求相关的 请求行 、请求头  、 请求体---------

    res.statusCode = 315;
    res.statusMessage = 'my 315'

    res.setHeader('token','ok')
    //res.write('1'); // 服务器给浏览器写入数据  可写流
    res.end('2');

    // --------------响应相关的 响应行  响应头  响应体
    // 11.00 继续 -> 静态服务 -> 写工具 -> 写koa
})

// server.on('request',function(req,res){
//     console.log('request ~~~')
// });
// 不要使用低于3000端口，可能过低的端口被内部占用了
let port = 4000;
server.listen(port,function(){
    console.log('server listen '+port)
});

server.on('error',function (err) {
    if(err.code === 'EADDRINUSE'){
        server.listen(++port); // 监听成功后会调用对应的回调
    }
})

// 每次修改服务端代码都需要重启服务器， 如果使用了正在使用的端口

// nodemon 可以监听node服务 npm install nodemon -g /  nodemon 1.http.js