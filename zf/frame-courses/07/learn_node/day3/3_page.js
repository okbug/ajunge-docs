let http = require('http');

let fs = require('fs')
let pfs = fs.promises;


let server = http.createServer((req, res) => {
  console.log(req.url)
  if (req.url == '/') {
    req.url = '/index.html'
  }
  let url = './public' + req.url
  pfs.readFile(url).then(data => {
    res.end(data)
  }).catch(err => {
    res.end(err)
  })
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