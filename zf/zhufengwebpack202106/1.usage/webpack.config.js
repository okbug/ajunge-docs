const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//压缩css
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
//压缩JS
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
module.exports = {
  mode: 'none',
  devtool: false,
  optimization:{
    minimize:true,
    minimizer:[
      new TerserPlugin()
    ]
  },
  entry: {
   main:'./src/index.js',
   vendor:['lodash']//如果都用hash的话,如果改了index.js,vendor.hash.js缓存也会失效
  },
  //
  output: {
    path: path.resolve(__dirname, 'dist'), // 输出目录
    filename: '[name].[hash].[chunkhash:6].js', // 文件名
  },
  devServer:{

  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env', '@babel/preset-react',
              ],
              plugins: [
                ['@babel/plugin-proposal-decorators', { legacy: true }],
                ['@babel/plugin-proposal-class-properties', { loose: true }],
                ["@babel/plugin-proposal-private-methods", { "loose": true }]
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // css转成JS 结果 一定是JS，因为它的结果就是给webpack用了
          {
            loader: 'css-loader', // url import 进行处理
            options: {
              // 在处理引入的别的CSS的文件，要先把别的CSS文件经过几个loader的处理结果 合并到当前文件中
              importLoaders: 1,
              modules: false,
            },
          },
          'postcss-loader', // css 预处理器
          {
            loader:'px2rem-loader',
            options:{
              remUnit:75,//规定一个REM单位是75px
              remPrecession:8 //计算REM的精度,保留几位小数
            }
          }
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader, // css转成JS 结果 一定是JS，因为它的结果就是给webpack用了
          {
            loader: 'css-loader', // url import 进行处理
            options: {
              importLoaders: 2,
            },
          },
          'postcss-loader',
          'less-loader', // 把less编译成css  在这一步已经 把import 进行转换CSS了
        ],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, // css转成JS 结果 一定是JS，因为它的结果就是给webpack用了
          {
            loader: 'css-loader', // url import 进行处理
            options: {
              importLoaders: 2,
            },
          },
          'postcss-loader',
          'sass-loader', // 把less编译成css
        ],
      },
      {
        test: /\.(jpg|png|gif|bmp|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              esModule: false,
              name: '[hash:10].[ext]',
              // 以8K为分界线 如果引入的文件小于8K，就把图片变成base64字符串插入html,否则 和file-loader一样的
              limit: 8 * 1024,
              outputPath:'images',
              publicPath:'/images'
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify:{
        removeComments:true,
        collapseWhitespace:true
      }
    }),
    new MiniCssExtractPlugin({
      filename:'style/[name].[contenthash:6].css'
    }),
    new OptimizeCssAssetsWebpackPlugin()
  ],
};
