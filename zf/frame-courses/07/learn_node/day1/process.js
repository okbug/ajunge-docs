let a = 123;
function fn() { }
console.log(a)
// console.log(process) // node 的全局变量
console.log(process.platform)// 对应的值 就是当前执行的系统环境

console.log(process.argv)
// 默认两个参数  第一个 就是node的地址  第二个是当前执行文件的地址

// -- 开头的都是属性名  后边的那个就是属性值
// let reg = /^--(\w+)/
// process.argv.forEach((item, index) => {
//   if (reg.test(item)) {
//     console.log(item.match(reg)[1] + '是' + process.argv[index + 1])
//   }
// })
// commander专门用来解析行内参数的一个包

let program = require('commander');

// console.log(program)
program.option('--port <v>', 'set your port')
program.option('--port1 <v>', 'set your port1')
program.option('--port2 <v>', 'set your port2')
program.option('--port3 <v>', 'set your port3')
program.usage('myserve')
program.name('hello')
let obj = program.parse(process.argv)
console.log(obj)

// process.env 环境变量
process.env.qqq = 123;
console.log(process.env.qqq)


