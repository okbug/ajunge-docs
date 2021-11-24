const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 读取.env这个文件，把里面配置的key value写入到process.env对象里
require('dotenv').config({ path: path.resolve('config/.env') });
const CopyWebpackPlugin = require('copy-webpack-plugin');

const webpack = require('webpack');
module.exports = {
  mode: 'development',
  devtool: false,//不生成任何sourcemap
  //devtool: 'hidden-source-map',//source-map 行+列+babel映射
  entry: {
    main: './src/index.js', // 入口文件
  },
  output: {
    path: path.resolve(__dirname, 'dist'), // 输出目录
    filename: 'main.js', // 文件名
    // publicPath:'/assets'
  },
  //外部依赖 模块名:全局变量
  /* externals:{
    lodash:'_',
    jquery:'jQuery', //window.jQuery
  }, */
  // express启动一个HTTP服务器 通过它可以访问产出的文件
  devServer: {
    // publicPath:'/',
    contentBase: path.resolve('public'), // 额外的静态文件内容的目录
    compress: true, // 是否启动压缩 gzip
    port: 8080, // 服务器监听的端口号
    open: true, // 是否打开浏览器提供访问
  },
  module: {
    rules: [
      {
        test:/jquery/,
        loader:'expose-loader',
        options:{
          exposes:{//向全局对象上也就是window上挂变量 window._,如果原来已经_已经 有值 ， 重写它
            globalName:'jQuery',
            override:true
          }
        }
      },
       {
        test:/lodash/,
        loader:'expose-loader',
        options:{
          exposes:{//向全局对象上也就是window上挂变量 window._,如果原来已经_已经 有值 ， 重写它
            globalName:'__',
            override:true
          }
        }
      },
    /*   {
        test: /\.js$/, // 如果加载的模块是以.js结尾 的
        loader: 'eslint-loader', // 进行代码风格检查
        enforce: 'pre', // 给loader进行分类 pre=>normal=>inline=>post
        options: { fix: true }, // 如果发现不合要求，会自动修复
        exclude: /node_modules/, // 不处理node_modules文件
      }, */
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
        test: /\.txt$/,
        use: 'raw-loader', // loader就是把wepback不认识的内容转换成webpack认识的内容
      },
      {
        test: /\.css$/,
        use: [
          'style-loader', // css转成JS 结果 一定是JS，因为它的结果就是给webpack用了
          {
            loader: 'css-loader', // url import 进行处理
            options: {
              // 在处理引入的别的CSS的文件，要先把别的CSS文件经过几个loader的处理结果 合并到当前文件中
              importLoaders: 1,
              modules: false,
              /*  modules: {
                                mode: "local",
                                localIdentName: "[path][name]__[local]--[hash:base64:5]",
                            } */
            },
          },
          'postcss-loader', // css 预处理器
        ],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader', // css转成JS 结果 一定是JS，因为它的结果就是给webpack用了
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
          'style-loader', // css转成JS 结果 一定是JS，因为它的结果就是给webpack用了
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
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    //let _ = require('lodash'); 自动向每个模块内注入_变量
    new webpack.ProvidePlugin({
      _:'lodash'
    }),
    new CopyWebpackPlugin({
      patterns:[
        {
          from:path.resolve(__dirname,'src/public'),
          to:path.resolve(__dirname,'dist/public')
        }
      ]
    })
    /* 
    讲插件的时候，我会自实现这个插件
    new HtmlWebpackExternalsPlugin(
     {
      externals: [
        {
          module: 'jquery',//模块名
          entry: 'dist/jquery.min.js',
          global: 'jQuery',
        },
      ],
     }
    ), */
    /* new webpack.SourceMapDevToolPlugin({
      filename:'[file].map',// file=main.js => main.js.map
      append:`\n//# sourceMappingURL=http://127.0.0.1:8080/[url]` //url=main.js.map
    }),
    */
   /*  new FileManagerPlugin({
      events:{
        onEnd:{
          copy:[
            {
              source:'./dist/*.map',
              destination:path.resolve('maps')
            }
          ],
          delete:['./dist/*.map']
        }
      }
    })  */
  ],
};
