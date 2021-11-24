const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const webpack = require('webpack');

let devConfig={}
let prodConfig={};
let config = process.env.NODE_ENV==='production'?prodConfig:devConfig;
module.exports = {
    // mode 当前的运行模式  开发环境  生产环境 不指定环境
    mode: 'development',
    devtool: 'hidden-source-map',
    entry: './src/index.js',
    output: {
        path: resolve(__dirname, 'dist'), // 输出文件夹的绝对路径
        filename: 'main.js', // 输出的文件名
    },
    devServer: {
        contentBase: resolve(__dirname, 'static'),
        compress: true, /// 是否启动压缩 gzip
        port: 8080, // 指定HTTP服务器的端口号
        open: true, // 自动打开浏览器
    },
    externals: {
        lodash: '_',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'eslint-loader', // 先进行代码校验，然后再编译代码
                enforce: 'pre', // 强制指定顺序 pre 之前 pre normal inline post
                options: { fix: true }, // 启动自动修复
                include: resolve(__dirname, 'src'), // 只检查src目录里面的文件 白名单
                // exclude:/node_modules/ //不需要检查node_modules里面的代码 黑名单
            },
            {
                test: /\.jsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ["@babel/preset-env", { 
                                    useBuiltIns:'usage',
                                    corejs:{version:3},
                                    targets: ">0.25%" }],
                            ],
                            plugins: [
                               /*  [
                                    '@babel/plugin-transform-runtime',
                                    {
                                        corejs:3,
                                        helpers:true,
                                        regenerator:true
                                    }
                                ], */
                                ["@babel/plugin-proposal-decorators", { legacy: true }],
                                ["@babel/plugin-proposal-class-properties", { loose: true }],
                            ],
                        },
                    },
                ],
            },
            { test: /\.txt$/, use: 'raw-loader' },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
            {
                test: /\.(jpg|png|gif|bmp)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: '[hash:10].[ext]',
                        esModule: false,
                        limit: 32 * 1024,
                    },
                }],
            },
            { test: /\.html$/, use: ['html-loader'] },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        /* new webpack.SourceMapDevToolPlugin({
            filename:'[file].map',//定义生成的 source map 的名称 main.js.map
            //append:"\n//# sourceMappingURL=http://localhost:8081/[url]"
        }),
        new FileManagerPlugin({
            events:{
                onEnd:{
                    copy:[
                        {
                            source:'./dist/.map',
                            destination:'C:/aproject/zhufengwebpack202011/1.basic/sourcemap'
                        }
                    ],
                    delete:['./dist/*.map']
                }
            }
        }) */
    ],
};
