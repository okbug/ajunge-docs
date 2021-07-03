let path = require('path');// node 的内置包

// 专门用来清除 历史文件的一个插件
let { CleanWebpackPlugin } = require('clean-webpack-plugin')
let html = require('html-webpack-plugin')
// 每一个用node执行的js文件中都会有 require module  exports  __dirname __filename
//__dirname  当前文件所在文件夹的绝对目录
// __filename 当前文件所在的绝对目录
console.log(path.resolve(__dirname, 'app'))
console.log(__dirname)
module.exports = {
  // 这个对象就是给webpack适用的 配置向
  mode: 'production',
  entry: './src/main.js', //  默认就是 src下的 index.js
  output: {
    // 打包资源的位置配置
    filename: 'hello.[hash].js', // 默认是 main.js  打包后的文件的名字
    path: path.resolve(__dirname, 'app')  // 控制的是打包后的文件的位置  需要是一个绝对路径
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!hello.html'],
    }),
    new html({
      template: './public/index123.html',
      filename: 'qqq.html',
      title: "珠峰666",
      aaa: "<link href='https://baidu.com/1.css'>"
    })
  ]
}