let a = 123;
let b = 456;

module.exports = {
  a, b
}
// module  require  __dirname  __filename  exports
// 
// console.log(module, require, __dirname, __filename, exports)
// module.exports 一般用来负责导出
// require一般用来负责导入
// __dirname 当前文件所在文件夹的绝对目录
// __filename 当前文件所在的绝对目录
console.log('__dirname', __dirname)
console.log('__filename', __filename)