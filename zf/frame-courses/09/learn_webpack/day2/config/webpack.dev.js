let common = require('./webpack.common')
let { merge } = require('webpack-merge')
module.exports = merge(common, {
  mode: 'development'
})