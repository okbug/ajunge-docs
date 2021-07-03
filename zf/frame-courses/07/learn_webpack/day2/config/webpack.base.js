let path = require('path')
let { CleanWebpackPlugin } = require('clean-webpack-plugin');
let Html = require('html-webpack-plugin');
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.[hash:6].js',
    path: path.resolve(__dirname, '../dist')
  },
  plugins: [
    new CleanWebpackPlugin(),
    new Html({
      template: "./public/index.html",
      filename: 'index.html',
      minify: false
    })
  ]
}