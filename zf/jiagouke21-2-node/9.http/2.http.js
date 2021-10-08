
// 静态服务
const http = require('http');
const fs = require('fs')
const url = require('url');
const path = require('path');

// url 的组成 协议://（用户名：密码）域名：端口号/资源路径？查询参数#hash
const mime = require('mime');

// 像前端的location
const {pathname,query} = url.parse('http://username:password@www.zf.cn:8080/xxx?a=1#hash',true)

const server = http.createServer((req,res)=>{
    const {pathname} = url.parse(req.url); // 后端的路由，根据前端发送的请求，来识别我要做什么事
    
    // 根据路径来读取文件,这里的逻辑 一般使用异步操作来处理
    // /public/index.html
    const filePath = path.join(__dirname,pathname)
    fs.readFile(filePath,function(err,data){
        if(err){
            res.statusCode  = 404;
            return res.end('Not Found')
        }
        res.setHeader('Content-Type',mime.getType(filePath) + ';charset=utf8');
        res.end(data); // 将数据直接返回给浏览器
    })
});
server.listen(3000);

// 写一个静态服务器， 会通过一个 http-server来启动