let http = require('http');// 专门用来其服务的一个内置模块


let server = http.createServer((request, response) => {
  // 当有人访问这个服务的时候 会触发这个回调函数
  // request 请求相关信息
  // response 响应相关信息
  // console.log(request)
  console.log(1)
  response.end(JSON.stringify({
    q: 123,
    w: 234,
    e: 666
  }))
})

server.listen(3000, () => {
  // 服务启动成功之后 会触发这个回调函数
  console.log('服务成功启动在端口' + 3000)
})


// 修改配置 完成之后 每次都要重启服务；  
// 为了避免这个麻烦  我们可以使用过 nodemon   npm install -g nodemon
// 使用的时候 用 nodemon 代替node   node 1.js  --> nodemon 1.js