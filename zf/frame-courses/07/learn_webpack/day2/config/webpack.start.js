
let { merge } = require('webpack-merge')
let base = require('./webpack.base.js')
let path = require('path')

/* var a = {
  a: {
    b: 123,
    q: 666
  }
}

var c = {
  a: {
    b: 666,

  }
}

console.log(merge(a, c)) */

let src = path.resolve(__dirname, '../src')
let webpack = require('webpack');
let obj = merge(base, {
  mode: 'development',
  devServer: {
    //https://webpack.docschina.org/configuration/dev-server/#devserverport
    port: 3000,
    open: true, //默认打开浏览器   --open
    compress: true,// 为文件开启 gzip压缩
    contentBase: path.resolve(__dirname, '../assets'),// 吧这个文件夹做成了一个服务
    // https: true,// 适用于 后端服务是https的
    proxy: {
      '/api': 'http://baidu.com',
      '/api1': 'http://163.com',
      '/api2': {
        // /api/qq     http://baidu.com/api/qq
        // /api2/qq     http://baidu.com/qq
        target: 'http:souyidai.com',
        pathRewrite: {
          '^/api2': ''
        }
      }
    },
    before: function (app) {
      // 走代理之前会先走这个 before
      // mock的原理
      app.get('/api/qq', function (req, res) {
        res.json({ custom: 'response', a: 123, b: 345 });
      });
    }

  },
  plugins: [
    new webpack.DefinePlugin({
      // 属性值一个字符串的话  最终会编译成表达式
      PRODUCTION: JSON.stringify(false),
      // VERSION: JSON.stringify('5fa3b9'),
      BROWSER_SUPPORTS_HTML5: true,
      TWO: '1+1',
      'typeof window': JSON.stringify('qqqq'),
      'process.env.MY_NODE_ENV': '"develoment"',
      // '@': JSON.stringify(src)
    })
  ]
})

module.exports = obj