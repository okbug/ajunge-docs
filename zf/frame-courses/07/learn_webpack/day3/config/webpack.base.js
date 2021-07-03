let path = require('path');
let { CleanWebpackPlugin } = require('clean-webpack-plugin')
let Html = require('html-webpack-plugin');
// mini-css-extract-plugin   可以把引入到JS文件中的css单独拎成一个css文件
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');


module.exports = {
  // entry: './src/index.js',
  entry: {
    myindex: './src/index.js',
    myother: './src/other.js',
    common: './src/common.js'
  },
  output: {
    // filename: 'chunk.[hash:5].js',
    filename: '[name].[hash:6].js',
    path: path.resolve(__dirname, '../dist2'),
    publicPath: '/'
    // assetModuleFilename: 'images/[name][ext][query]'
  },
  // loader只是为了 把webpack不认识的模块转化成为  webpack能认识的模块
  // 也就是说 loader就是单纯处理文件的
  // 插件是对于webpack的一个功能的扩展  可以实现  loader实现不了的功能
  module: {
    rules: [
      // test 是用来匹配对应的文件的
      // use 是告诉wenpack 用 什么loader去处理匹配到的文件
      //  use  可以跟 字符串  数组   对象
      //  use的执行顺序 是 从右到左   从下到上
      {
        test: /\.css$/i,
        // css-loader是把css转译成 JS能认识的文件   style-loader是吧对应的css
        // 变成style标签 插入到页面中
        // use: ['style-loader', 'css-loader']
        use: [{
          loader: MiniCssExtractPlugin.loader
        }, {
          loader: 'css-loader'
        }, 'less-loader', {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                'postcss-preset-env'
              ]
            }
          }
        }],
        exclude: /node_modules/
      },
      {
        test: /\.less$/i,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader', 'postcss-loader']
      },
      {
        test: /\.(jpg|jpeg|ico|webp|png|gif)$/i,
        use: {
          loader: 'url-loader',
          options: {
            // limit: 40 * 1024 // 小于40kb就转成base64
            limit: 4 * 1024,// 小于40kb就转成base64
            name: 'img/[name].[ext]'
          }
        }
      },
      // {
      //   test: /\.(jpg|jpeg|ico|webp|png|gif)$/i,
      //   type: 'asset/resource'
      // }
      {
        test: /\.js$/i,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
    /* 
      postcss是专门用来处理css的一个模块
      结合 postcss-loader  和 postcss.config.js（配置文件） 和 .browserslistrc
    
    */
  },
  plugins: [
    // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/), // 4.0的写法
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/
    }),
    // 告诉 webpack 忽略 mement下的 local的内容
    new webpack.ProvidePlugin({
      '$': 'jquery',
      '$$': 'jquery',
      // 'React': 'react'
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    new Html({
      template: './public/index.html',
      filename: 'index.html',
      chunks: ['myindex', 'common']
    }),
    new Html({
      template: './public/other.html',
      filename: 'other.html',
      chunks: ['myother', 'common']
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src')
    },
    extensions: ['.js', '.json', '.vue', '.css'],
    modules: [path.resolve(__dirname, '../src'), 'node_modules'],
  },
  externals: {
    // 'jquery':"$",
    // 'jquery': "jQuery",
  }
}