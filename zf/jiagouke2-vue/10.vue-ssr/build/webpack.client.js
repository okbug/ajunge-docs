const base = require('./webpack.base')
const {merge} = require('webpack-merge');
// mergeOptions   webpack-merge
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const resolve = (dir) => {
    return path.resolve(__dirname, dir); // 传入路径 通过当前文件所在的位置找到这个文件
}
module.exports = merge(base,{
    entry:{
        client: resolve('../src/client-entry.js')
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:resolve('../public/index.html')
        })
    ]
});