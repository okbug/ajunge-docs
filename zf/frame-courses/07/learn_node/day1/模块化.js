
// 每一个JS文件都是一个单独的模块
// commonjs 规范  node require exports
// esModule  import  export 
let obj = require('./utils/a')
let w = require('./utils')

console.log(obj)
// obj.qqq.q = 555
// console.log(obj)
// console.log(global)

// require exports  module  __dirname  __filename 这五个东西都是  每一个模块单独的变量


//node执行文件的时候 就是把文件的内容放到一个函数抱起来执行
// (function (require, exports, module, __dirname, __filename) {

// })()


console.log(__dirname, __filename)
//__dirname 是当前文件所在文件夹的绝对目录
//__filename 当前文件的绝对目录


// import aaa from './utils/b.js' // 这种方式的导入 对应的是默认导出
// import { b } from './utils/b.js'

// import * as bbb from './utils/b.js'
// console.log(aaa)
// console.log(b)
// console.log(bbb)



