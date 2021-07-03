let { merge } = require('webpack-merge')
let base = require('./webpack.base')
let path = require('path')
let mock = require('../mock')
module.exports = merge(base, {
  mode: 'development',
  devServer: {
    // 这里的配置只在本地开发的时候起作用  上线 跟这里一点关系没有
    port: 3000,// 端口号
    // open: true,// 是否默认打开浏览器
    contentBase: path.resolve(__dirname, '../public'),// 指定某个文件夹作为静态服务
    proxy: {
      // '/api': 'http://localhost:9000', // http://localhost:9000/api/qq
      '/api': {
        target: 'http://localhost:9000',// http://localhost:9000/qq
        pathRewrite: { '^/api': '' },
        changeOrigin: true,// 后端接到的请求 的域名 就是 http://localhost:9000
      },
      '/www': {
        target: 'http://localhost:8000',// http://localhost:9000/qq
        pathRewrite: { '^/api': '' },
        changeOrigin: true,// 后端接到的请求 的域名 就是 http://localhost:9000
      },
    },
    before: mock
  },
  devtool: "eval-cheap-module-source-map"
})

