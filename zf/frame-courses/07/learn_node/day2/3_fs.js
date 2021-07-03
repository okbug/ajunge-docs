let fs = require('fs');
let path = require('path')

// 创建文件夹的时候 把证父文件夹存在
// fs.mkdir('./q/w', {
//   recursive: true // 不管父文件夹是否存在 都创建
// }, (err) => {
//   console.log(err)
// })

// fs.readdir('./a', (err, data) => {
//   console.log(data) [1.txt,2.txt]
// })


// 查看文件信息
// fs.stat('./a', (err, stat) => {
//   // console.dir(stat)
//   console.log(stat.isFile()) // 判断当前目录是否是一个文件
//   console.log(stat.isDirectory())// 判断当前目录是否是一个文件夹
// })

// fs.rmdir('./q/w', (err) => {
//   console.log(err)
// })


function rmdir(dir, cb) {
  // 判断当前目录是文件 还是文件夹
  fs.stat(dir, (err, stat) => {
    if (stat.isFile()) {
      fs.unlink(dir, cb)
    } else {
      fs.readdir(dir, (err2, dirs) => {
        // 获取子父母跟父目录的一个拼接
        dirs = dirs.map(item => path.join(dir, item));
        if (dirs.length == 0) {
          fs.rmdir(dir, cb)
        } else {
          // 证明不是空文件夹
          let ind = 0;// 记录删除的索引的
          function done() {
            // 这个函数可以用来判断是否删干净了
            if (++ind == dirs.length) {
              //证明删除干净
              fs.rmdir(dir, cb)
            }
          }
          for (let i = 0; i < dirs.length; i++) {
            // 这个for循环是用来删除  文件夹里边的内容的
            let dir2 = dirs[i];// dir2 是文件还是文件夹？
            rmdir(dir2, done)
          }
        }
      })
    }
  })
}
rmdir('./a', (err) => {
  console.log(err)
})
