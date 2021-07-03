// fs 模块 内置模块 一般用来读写文件
// fs 的所有方法 都有同步和异步之分; 凡是带Sync的都是同步
let fs = require('fs');
let pfs = fs.promises

//  读文件
// // fs.readFile(文件路径)
// fs.readFile('./text.txt', {
//   encoding: 'utf-8', // 读取文件的编码方式  默认是null  读出来的就是buffer
//   flag: 'r' // 对应的操作
// }, (err, data) => {
//   // err  对应的是 读取失败的时候对应的错误信息
//   // data 对应的是 读取成功地时候 得到的数据  成功的时候 err的值 是null
//   console.log(err, data)
//   if (!err) {
//     // 读取成功
//     console.log(data.toString())
//   }
// })
// let data = fs.readFileSync('./text.txt')
// console.log(data)
// console.log(123)

// let p = pfs.readFile('./text.txt')
// // console.log(p)
// p.then(data => {
//   console.log('promise', data)
// })
// try {
//   let data = fs.readFileSync('../text.txt')
// } catch (error) {
//   console.log(error)
// }
// console.log(123)



// 写文件是一个覆盖的过程
// fs.writeFile('./text.txt', '你好', {
//   encoding: 'utf-8'
// }, (err) => {
//   if (!err) {
//     console.log('写陈宫了')
//   }
// })

// fs.readFile('./text.txt', (err, data) => {
//   if (!err) {
//     let str = data;
//     fs.writeFile('./text.txt', str + "只有胡风培训", (er) => {
//       console.log('陈工')
//     })
//   }
// })


// 
// fs.appendFile('./text.txt', '中国', (err) => {
//   console.log('添加陈工')
// })

// pfs.appendFile('./text.txt', '中国').then(data => {
//   console.log(data)
// })


// fs.unlink('./text123.txt', (err) => {
//   // 删除的时候 若不存在这个文件就报错
//   console.log(err, "删除")
// })


// pfs.readFile('./1_buffer.js').then(data => {
//   pfs.appendFile('./text.txt', data)
// })