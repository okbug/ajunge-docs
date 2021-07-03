let obj = require('./mock')
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://baidu.com'
      }
    },
    before: obj.before
  }
}