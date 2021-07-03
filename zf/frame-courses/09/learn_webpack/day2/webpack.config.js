let path123 = require('path');// node的内置包
let { CleanWebpackPlugin } = require('clean-webpack-plugin')
let html = require('html-webpack-plugin')
// module.exports = {
//   mode: "development",
//   entry: './src/main.js',
//   output: {
//     filename: 'index.[hash:6].js',// 默认 main.js
//     path: path123.resolve(__dirname, 'dist')
//   },
//   plugins: [
//     new CleanWebpackPlugin({
//       cleanOnceBeforeBuildPatterns: ['**/*', '!index.html'],
//     }),
//     new html({
//       template: "./public/index.html",
//       filename: 'qq.html',
//       title: '珠峰培训',
//       aaa: "hello",
//       qqq: '<link href="https://163/a/c.css">'
//     })
//   ]
// }

module.exports = function () {
  console.log(arguments)
  return {
    mode: 'production',
    entry: './src/main.js'
  }
}