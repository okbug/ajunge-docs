let http = require('http');// 专门用来其服务的一个内置模块


let server = http.createServer((req, res) => {
  // console.log(req.method) // get post
  console.log(req.url)// 请求路径

  res.end("haha")
})

let port = 8080
server.listen(port, () => {
  console.log('服务成功启动在端口' + port)
})


server.on('error', function (err) {
  // console.log('报错信息', err)
  if (err.errno == 'EADDRINUSE') {
    // 证明当前端口已经被占用了
    server.listen(++port)
  }
})


///postman  前端一般用不上   一般是后台用来调试接口的
