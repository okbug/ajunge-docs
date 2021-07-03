let path = require('path')// path是node的内置模块
console.log("这是一个配置文件", path.resolve(__dirname, 'qqq'))
// __dirname
module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    filename: 'qqq.js',// 打包后的文件的名字
    path: path.resolve(__dirname, 'qqq') // 打包后的文件的存放路径，这个路径要求必须是一个绝对路径
  }
}