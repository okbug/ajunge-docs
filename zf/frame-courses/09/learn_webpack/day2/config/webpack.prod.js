let common = require('./webpack.common')
let { merge } = require('webpack-merge')
let webpack = require('webpack')
module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      // 编译阶段的全局变量
      QQQ: 123,
      WWW: "'hello'",
      // 'q + 1 + 2': 100,
      'typeof window': JSON.stringify('number'),
      'process.env.NODE_ENV': "'production'",
      COPYRIGHT: {
        AUTHOR: JSON.stringify("珠峰培训")
      }
    })
  ]
})