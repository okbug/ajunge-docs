const path = require('path');
const DonePlugin = require('./plugins/done-plugin');
const AssetPlugin = require('./plugins/assets-plugin');
const ArchivePlugin = require('./plugins/archive-plugin');
const AutoExternalPlugin = require('./plugins/auto-external-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'development',
    devtool: false,
    entry: './src/index.js',
    /*  externals: {
         //我们的lodash这个模块可以从全局对象的_属性上获取 window._
         'lodash': '_'
     }, */
    plugins: [
        new DonePlugin(),
        new AssetPlugin(),
        new ArchivePlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new AutoExternalPlugin({
            lodash: {
                globalVariable: '_',
                url: 'https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.js'
            }
        })
    ]
}