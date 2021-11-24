const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'development',//none production development
    //指定项目打包的入口
    entry: './src/index.js',
    output: {
        //指定输出的目录，默认是dist目录,目录的配置必须是一个绝对路径而非相对路径
        path: path.resolve(__dirname, 'dist'),
        //指定的是文件名，默认是main.js
        filename: 'main.js'
    },
    devtool: false,
    devServer: {
        port: 8080,//配置开发预览服务器的端口号8080
        open: true,//打包后会自动打开浏览器
        /* proxy: {
            //把访问路径是以/api开头的请求都转发到http://localhost:3000
            '/api': {
                target: 'http://localhost:3000',//重定向的域名
                pathRewrite: { //重写的路径
                    "^/api": ""
                }
            }
        } */
        //在 webpack-dev-server静态资源中间件处理之前，可以用于拦截部分请求返回特定内容，以实现简单的mock
        onBeforeSetupMiddleware({ app }) {
            app.get('/api/users', (req, res) => {
                res.json([{ id: 1, name: "张三" }, { id: 2, name: "李四" }]);
            });
        }
    },
    resolve: {
        alias: {
            '@': path.resolve('src')
        }
    },
    //如果你配置了externals,key是库的名字，值是全局变量名
    //以后你再引入这个库的时候，直接从全局变量名上取值即可
    //key就是模块名 值是全局全局变量名，谁给全局变量赋值的呢 cdn

    externals: {
        lodash: '_'
    },
    module: {
        rules: [
            /*  {
                 test: /index\.js$/,
                 use: [
                     path.resolve(__dirname, 'loaders', 'loader1.js'),
                     path.resolve(__dirname, 'loaders', 'loader2.js'),
                     path.resolve(__dirname, 'loaders', 'loader3.js')
                 ]
             }, */
            {
                test: /isarray/,
                use: [
                    {
                        loader: 'expose-loader',
                        options: {
                            exposes: {
                                globalName: 'isarray',
                                override: true
                            }
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            url: true,//启用/禁用url解析 url(./kf.jpg);
                            import: true, //是否允许或者说禁 用@import语法处理 @import "base.css";
                            modules: false,// 是否允许 CSS 模块化
                            sourceMap: false,//是否生成sourcemap
                            importLoaders: 0, //允许或者说启动几个数量的loaders应用在import 的文件
                            esModule: false //默认情况下，css-loader生成使用ES Module的模块对象，如果你亩false的话，不包装成ESMODULES
                        }
                    },
                    'postcss-loader',
                    path.resolve(__dirname, 'loaders', 'loader1.js'),
                    path.resolve(__dirname, 'loaders', 'loader2.js'),
                    path.resolve(__dirname, 'loaders', 'loader3.js')
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    'postcss-loader',
                    'less-loader'
                ]
            }, {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.(jpg|png|bmp|gif)/,
                type: 'asset/resource',
                generator: {
                    filename: '[hash][ext]'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        /* new webpack.ProvidePlugin({
            isarray: 'isarray'
        }) */
    ]
}

// process.env.NODE_ENV  这个指的是当前的webpack打包时的node环境里的变量
// process代表当前的node进程 env 代表环境变量 NODE_ENV 代表一个key
//cross-env NODE_ENV=production相当于设置node环境变量了，改变process.env.NODE_ENV
//设置环境变量的方式在window和mac里不一样
//window set Key=Value
//Mac  Key=Value
/*
console.log('process.env.NODE_ENV', process.env.NODE_ENV)
module.exports = (env) => {
    return {
        mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',//none production development
        //指定项目打包的入口
        entry: './src/index.js',
        output: {
            //指定输出的目录，默认是dist目录,目录的配置必须是一个绝对路径而非相对路径
            path: path.resolve(__dirname, 'dist'),
            //指定的是文件名，默认是main.js
            filename: 'main.js'
        },
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html'
            }),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': process.env.NODE_ENV
            })
        ]
    }
} */