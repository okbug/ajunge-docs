let path = require('path');
let html = require('html-webpack-plugin')
let { CleanWebpackPlugin } = require('clean-webpack-plugin')
let webpack = require('webpack')
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
let cssmini = require('css-minimizer-webpack-plugin')
let terser = require('terser-webpack-plugin')
module.exports = {
  // entry: './src/index.js',
  // output: {
  //   path: path.resolve(__dirname, '../app'),
  //   filename: 'chunk.[hash:6].js'
  // },
  entry: {
    myindex: './src/index.js',
    myother: './src/other.js',
    common: './src/common.js'
  },
  output: {
    path: path.resolve(__dirname, '../app'),
    filename: "[name].[fullhash:6].js",
    // publicPath: '/qqq/',
    assetModuleFilename: 'images/[name][ext][query]'
  },
  plugins: [
    new html({
      template: './public/index.html',
      filename: 'index.html',
      title: "珠峰",
      minify: false,
      chunks: ['myindex', 'common']
    }),
    new html({
      template: './public/other.html',
      filename: 'other.html',
      title: "珠峰",
      minify: false,
      chunks: ['myother', 'common']
    }),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      OBJ: {
        HELLO: "1+1"
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'css/index.css'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      // ...
    })
  ],
  module: {
    // use  后边可以跟
    // 1 字符串
    // 2 数组 [字符串或者对象]
    // 3 对象
    // use 使用loader的加载顺序是从右到左的；从下往上
    noParse: /jquery|lodash/,
    rules: [
      {
        test: /\.css$/i,
        // css-loader负责把 js中的css转成不报错的代码
        // style-loader 负责把css通过 style标签插入到html文档中
        // use: ['style-loader', {
        //   loader: 'css-loader',
        //   options: {

        //   }
        // }]
        // use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '../',
          },
        }, 'css-loader', 'postcss-loader'],

      },
      {
        test: /\.less$/i,
        // less-loader 负责把less编译成css
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader', {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                "postcss-preset-env"
              ]
            }
          }
        }],
        exclude: /node_modules/ // 告诉webpack node_modules这里的css不用这么处理
      },
      {
        test: /\.(jpeg|png|gif|jpg|mp3)$/i,
        type: 'asset/resource',
        // use: [{
        //   loader: 'url-loader',
        //   options: {
        //     limit: 5 * 1024,// 大小超过5kb 就使用file-loader,不超过就转成base64
        //     name: 'img/[name].[ext]'
        //   }
        // },]
      },
      {
        test: /\.js$/i,
        use: ['thread-loader', 'babel-loader'],
        exclude: /node_modules/
      }
    ]
  },
  optimization: {
    minimizer: [
      new cssmini(),
      // new terser()
    ]
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, '../src')
    },
  },
}

// postcss-loader  
// 先安装  postcss-loader   和 postcss
//  再对应的地方添加loader
//  再去设置postcss的对应插件  安装postcss-preset-env(配置项可以再单独的配置文件中或者webpack的配置中)
//  最后 告诉插件 兼容哪些浏览器