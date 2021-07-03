let { merge } = require('webpack-merge')
let base = require('./webpack.base')
module.exports = merge(base, {
  mode: 'production',
  devtool: 'source-map'
})