// 基本配置
const path = require('path');

const VueLoaderPlugin = require('vue-loader/lib/plugin')
const resolve = (dir) => {
    return path.resolve(__dirname, dir); // 传入路径 通过当前文件所在的位置找到这个文件
}
module.exports = { // 入口
    output: { // 出口 通过打包的文件产生的结果
        // 配置多个入口
        filename: '[name].bundle.js', // 结果的名字
        path: resolve('../dist') // 产生的路径
    },
    resolve:{ // 解析文件时 按照以下顺序查找后缀 
        extensions:['.js','.vue','.css','.jsx']
    },
    module: { // 针对不同模块做处理
        rules: [{
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                // 默认会把.vue 文件中的样式变成 .css
                test: /\.css$/, // loader 的执行顺序 是 从下到上 从右到左
                use: ['vue-style-loader', 'css-loader']
            },
            {
                test: /\.js$/,
                use: {
                    options: { // 告诉js 文件需要通过es6-> es5的插件转化
                        presets: ['@babel/preset-env']
                    },
                    loader: 'babel-loader' // 默认使用babel-loader => babel-core(transform) => preset
                },
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
    ]
}
