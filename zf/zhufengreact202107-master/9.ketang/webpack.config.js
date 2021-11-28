const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require('path');
module.exports = {
    mode:'development',
    entry:'./src/index.tsx',
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'main.js'
    },
    devtool:'source-map',
    devServer:{
        hot:true,//启动热更新
        contentBase:path.join(__dirname,'static'),//额外的静态文件目录
        historyApiFallback:{
            index:'./index.html',//browserHistory 刷新会报404，所以要服务端配置重定向
        }
    },
    resolve:{
        alias:{
            '@':path.resolve(__dirname,'src'),
            '~':path.resolve(__dirname,'node_modules'),
        },
        extensions:[".ts",".tsx",".js",".json"]
    },
    module:{
        rules:[
            {
                test:/\.tsx$/,
                use:[{
                    loader:'babel-loader',
                    options:{
                        presets:[
                            "@babel/preset-env",//ES6=>ES5
                            "@babel/preset-react",//React=>ES5
                            "@babel/preset-typescript",//typescript=>ES5
                        ],
                        plugins:[
                            ["import",{libraryName:'antd',style:'css'}]
                        ]
                    }
                }],
                //include:path.resolve('src'),
                exclude:/node_modules/
            },
            {
                test:/\.css$/,
                use:[
                    "style-loader",
                    {
                        loader:'css-loader'
                    }
                ]
            },
            {
                test:/\.less$/,
                use:[
                    "style-loader",//把处理完成后的css变成style标签插入到页面中
                    {
                        loader:'css-loader' //处理import另外的less文件 和url的图片路径的
                    },
                    {
                        loader:'postcss-loader',//添加CSS兼容的厂商前缀 -webkit -o -moz
                        options:{
                            postcssOptions:{
                                plugins:["autoprefixer"]
                            }
                        }
                    },
                    {
                        loader:'px2rem-loader',//所px转换成rem
                        options:{
                            remUnit:75,//rem的单位
                            remPrecesion:8,//rem计算的精度
                        }
                    },
                    'less-loader'//1.把less编译成css
                ]
            },
            {
                test:/\.(jpg|png|gif|svg|jpg)$/,
                type:'asset'//webpack5的 url-loader file-loader
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        }),
        new CopyWebpackPlugin({
            patterns: [
              { from: path.resolve(__dirname,'static'), to: path.resolve(__dirname,'dist') },
            ],
        }),
    ]

}