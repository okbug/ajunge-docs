let path = require('path')
let { CleanWebpackPlugin } = require('clean-webpack-plugin')
let html = require('html-webpack-plugin');
module.exports = {

  entry: './src/main.js',
  output: {
    filename: 'app_prod.js',
    path: path.resolve(__dirname, '../prod_dist')
  },
  plugins: [
    new CleanWebpackPlugin(),
    new html({
      template: './public/index.html'
    })
  ]
}