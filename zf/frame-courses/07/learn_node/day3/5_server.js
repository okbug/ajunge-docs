let http = require('http');
let url = require('url')

let allowOrigin = [
  'http://127.0.0.1:5500',
  'http://127.0.0.1:5501',
  'http://127.0.0.1:5502'
]

let server = http.createServer((req, res) => {
  // req.method
  // req.url
  console.log(req.headers.origin)// 前端请求域名
  // res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500')
  if (allowOrigin.includes(req.headers.origin)) {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin)
    res.setHeader('access-control-allow-credentials', true)
    res.setHeader('access-control-allow-methods', 'GET')
  }

  res.setHeader('Set-Cookie', ['a=123;SameSite=Secure'])

  let { pathname, query } = url.parse(req.url, true)
  if (req.method.toLowerCase() === 'get') {
    let reg = /\/list2\/(\w+)/
    if (reg.test(pathname)) {
      console.log('list2后边的参数是:' + pathname.match(reg)[1])
    } else {
      console.log(query)
    }
    res.end('get')
    // console.log(url.parse(req.url, true).query) // 获取前端的get传参
  } else {
    // post请求
    let ary = []
    req.on('data', function (chunk) {
      ary.push(chunk)
    })
    req.on('end', function () {
      let bf = Buffer.concat(ary);// 合并之后的buffer  整个数据对应额哪个buffer
      console.log(bf, bf.toString())
      try {
        console.log(JSON.parse(bf.toString()))
      } catch (error) {
        console.log(url.parse('?' + bf.toString(), true))
      }

      res.end(bf)
    })

  }
})

server.listen(3000, () => {
  console.log(3000)
})


// 请求头： token   cookie   content-type
// 响应头：  是后端给前端的参数   Access-Control-Allow-Origin:  etag expries