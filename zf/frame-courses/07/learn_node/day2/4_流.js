let fs = require('fs')


// 可读流
let rs = fs.createReadStream('./text.txt')

// 可写流
let ws = fs.createWriteStream('./text2.txt')

// pipe
rs.pipe(ws)

rs.on('open', function (fd) {
  // fd 文件标识符
  console.log('open', fd)
})

rs.on('data', function (chunk) {
  // 接收数据的一个事件
  console.log('data', chunk)
})

rs.on('end', function () {
  console.log('end')
})
rs.on('error', function () {
  console.log('失败')
})




