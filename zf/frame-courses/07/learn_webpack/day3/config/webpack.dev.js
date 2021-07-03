let { merge } = require('webpack-merge')
let base = require('./webpack.base')
let mock = require('../mock/index')

module.exports = merge(base, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  //sourceMap专门用来调试代码的工具，让报错映射到原始文件
  devServer: {
    port: 3000,
    writeToDisk: true,
    proxy: {
      '/api': 'http://baidu.com',
      '/api2': {
        target: 'http://baidu.com',
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    before: mock
  }
})