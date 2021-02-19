const base = require('./webpack.base')
const {merge} = require('webpack-merge');

const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
// mergeOptions   webpack-merge
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const resolve = (dir) => {
    return path.resolve(__dirname, dir); // 传入路径 通过当前文件所在的位置找到这个文件
}
module.exports = merge(base,{
    entry:{
        a: resolve('../src/client-entry.js')
    },
    plugins:[
        new VueSSRClientPlugin(),
        // 前端打包出的结果 只是用于挂载到服务端生成的字符串中
        new HtmlWebpackPlugin({
            template:resolve('../public/index.html')
        })
    ]
});