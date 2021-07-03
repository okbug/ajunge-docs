let path = require('path');
let { CleanWebpackPlugin } = require('clean-webpack-plugin')
let HTML = require('html-webpack-plugin');
let webpack = require('webpack')
let MyPlugin = require('./util/myplugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  resolveLoader: {
    modules: ['node_modules', './util'],
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: 'myloader'
      }
    ]
  },
  plugins: [
    new MyPlugin(),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!dll_*', '!mani*'],
    }),
    new webpack.DllReferencePlugin({
      //在打包的时候  先去manifest.json文件中查看有没有这个包  有的话 就用导报
      manifest: path.resolve(__dirname, './dist/manifest.json')
    }),
    new HTML({
      template: './public/index.html'
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist')
  }
}