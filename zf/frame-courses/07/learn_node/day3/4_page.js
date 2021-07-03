let http = require('http')
let fs = require('fs');
let url = require('url')// 专门用来处理域名和路径的
let pfs = fs.promises;
let path = require('path');
let mime = require('mime')

// console.log(url.parse('/fgsdfg/sdfgsdfg?sewrt#ergd'))
// console.log(new URL('https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash'))

// console.log(path.join(__dirname, './public', '/q/w'))
// console.log(mime.getType('./public/index.html'))

class StaticServer {
  async handleRequest(req, res) {
    // req 是一个可读流   res是一个可写流
    let { pathname } = url.parse(req.url);
    // if (req.url == '/') {
    //   req.url = '/index.html'
    // }
    // let url = './public' + req.url

    if (pathname == '/list') {
      // res.end(JSON.stringify({
      //   q: 123,
      //   w: 234
      // }))
      let options = {
        host: 'localhost',
        port: 3000,
        path: pathname,
        headers: req.headers
      }
      let req2 = http.get(options, (res2) => {
        res2.pipe(res)
      })
      req.pipe(req2)
      return

    }

    let filepath = path.join(__dirname, './public', pathname)
    let stat = await pfs.stat(filepath);
    if (stat.isFile()) {
      // let data = await pfs.readFile(filepath);
      // res.end(data)
      // 设置响应头
      // res,setHeader('Content-Type','text/html;charset=utf-8')
      res.setHeader('Content-Type', `${mime.getType(filepath)};charset=utf-8`)
      // res.statusCode = 403// http状态码
      // res.statusMessage = 'hello' //不能写中文
      fs.createReadStream(filepath).pipe(res)
    } else {
      // 证明请求的路径是 /
      filepath = path.join(filepath, 'index.html')
      fs.createReadStream(filepath).pipe(res)
    }
  }
  start(port, cb) {
    let server = http.createServer(this.handleRequest.bind(this))


    server.on('error', function (err) {
      // console.log('报错信息', err)
      if (err.errno == 'EADDRINUSE') {
        // 证明当前端口已经被占用了
        server.listen(++port)
      }
    })
    server.listen(port, () => { cb(port) })
  }
}


new StaticServer().start(9000, function (p) {
  console.log("服务起于端口" + p)
})