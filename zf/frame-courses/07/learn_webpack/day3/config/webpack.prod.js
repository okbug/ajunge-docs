let { merge } = require('webpack-merge')
let base = require('./webpack.base')
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
module.exports = merge(base, {
  mode: 'production',
  optimization: {
    minimizer: [
      new TerserPlugin(),
      new OptimizeCssAssetsPlugin()
    ],
    splitChunks: {
      // 可以把一些三方包单独打包出去
      cacheGroups: {
        jq_mo: {
          name: "jq_mo",
          test: /jquery|moment/,
          chunks: 'initial'
        }
      }
    }
  }
})

/*
optimization: {
        splitChunks: {
            chunks: "all",//默认作用于异步chunk，值为all/initial/async
            minSize: 30000,  //默认值是30kb,代码块的最小尺寸
            minChunks: 1,  //被多少模块共享,在分割之前模块的被引用次数
            maxAsyncRequests: 5,  //按需加载最大并行请求数量
            maxInitialRequests: 3,  //一个入口的最大并行请求数量
            name: true,  //打包后的名称，默认是chunk的名字通过分隔符（默认是～）分隔开，如vendor~
            automaticNameDelimiter: '~',//默认webpack将会使用入口名和代码块的名称生成命名,比如 'vendors~main.js'
            cacheGroups: { //设置缓存组用来抽取满足不同规则的chunk,下面以生成common为例
                vendors: {
                    chunks: "initial",
                    test: /node_modules/,//条件
                    priority: -10 ///优先级，一个chunk很可能满足多个缓存组，会被抽取到优先级高的缓存组中,为了能够让自定义缓存组有更高的优先级(默认0),默认缓存组的priority属性为负值.
                },
                commons: {
                    chunks: "initial",
                    minSize: 0,//最小提取字节数
                    minChunks: 2, //最少被几个chunk引用
                    priority: -20,
                    reuseExistingChunk: true//    如果该chunk中引用了已经被抽取的chunk，直接引用该chunk，不会重复打包代码
                }
            }
        },
}





*/