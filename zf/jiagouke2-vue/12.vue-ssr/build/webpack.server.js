// 通过入口 打包出一份代码来，代码给node来使用
const base = require('./webpack.base')
const {merge} = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const resolve = (dir) => {
    return path.resolve(__dirname, dir); // 传入路径 通过当前文件所在的位置找到这个文件
}
// webpack打包服务端代码 是不需要引入打包后的js的 只是引入前端的打包后的结果
module.exports = merge(base,{
    entry:{
        b: resolve('../src/server-entry.js')
    },
    target:'node', // 给node使用  web
    output:{
        libraryTarget:'commonjs2' //  指定导出方式
    },
    plugins:[
        new VueSSRServerPlugin(),
        new HtmlWebpackPlugin({
            filename:'index.ssr.html', // html的名字
            template:resolve('../public/index.ssr.html'),
            minify:false, // 不压缩
            excludeChunks:['b'] // 排除引入文件 服务端的js
        })
    ]
});

// 后端的打包的结果决定html的内容  前端打包的结果决定 事件。