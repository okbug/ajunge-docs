let path = require('path')
let commander = require('commander')
let qqq = require('qqq')
let a = require('./utils')

// 包 分为三类    内置(fs path  url  http ...)   三方包(npm安装的node_modules)
// 模块的查找机制  先看内部 不是  去 node_modules中找 没有就去上层的node_modules中查找。。。。

// console.log(path)  主要用它 获取路径使用
// path.resolve   path.join
console.log(path.resolve(__dirname, './aaa.js'))
console.log(path.join(__dirname, './aaa.js'))

console.log('====================')

console.log(path.resolve(__dirname, '/aaa.js'))
console.log(path.join(__dirname, '/aaa.js'))
