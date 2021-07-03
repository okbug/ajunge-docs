let { merge } = require('webpack-merge')
let base = require('./webpack.base.js')

let webpack = require('webpack');
let obj = merge(base, {
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      // 属性值一个字符串的话  最终会编译成表达式
      PRODUCTION: JSON.stringify(false),
      // VERSION: JSON.stringify('5fa3b9'),
      BROWSER_SUPPORTS_HTML5: true,
      TWO: '1+1',
      'typeof window': JSON.stringify('qqqq'),
      'process.env.MY_NODE_ENV': '"production"'
    })
  ]
})

module.exports = obj