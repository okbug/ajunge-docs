const path = require("path")

const resolve = (...args) => path.resolve(__dirname, ...args)
// const rawLoader = require("./my-loaders/raw-loader")

const HtmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: resolve('dist'),
        filename: 'main.js'
    },
    devServer: {
        contentBase: resolve("dist"),
        port: 8081,
        open: true,
        compress: true
    },
    module: {
        rules: [
            {
                test: /\.txt$/,
                use: resolve("my-loaders", "raw-loader.js")
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.less$/,
                use: ["style-loader", "css-loader", "less-loader"]
            },
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.(jpg|png|gif|bmp)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: "[hash:10].[ext]",
                            limit: 1024 // 10kb
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: ["html-loader"]
            },
            {
                test: /\.jsx?$/,
                use: 'eslint-loader',
                enforce: "pre", // 强制指定顺序，这个是之前的意思
                // 这个会默认先触发，然后将转化后的代码传给下一个rule
                // options: {fix: true}, // 启动自动修复
                exclude: /node_modules/, // 排除不需要检验的代码
                // 或者include: resolve("src") // 只检测这里的代码
            },
            {
                test: /\.jsx?$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "@babel/preset-env",
                                // ["@babel/preset-env", {
                                //     useBuiltIns: 'usage', // 按需加载polyfill
                                //     corejs: {version: 3}, // 指定corejs的版本
                                //     targets: { // 指定要兼容哪些浏览器
                                //         chrome: '60',
                                //         firefox: "60",
                                //         ie: '9',
                                //         safari: "10",
                                //         edge: "17"
                                //     }
                                // }],
                                
                                "@babel/preset-react"
                            ],
                            plugins: [
                                ["@babel/plugin-proposal-decorators", {legacy: true}],
                                ["@babel/plugin-proposal-class-properties", {loose: true}]
                            ]
                        }
                    }

                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
    ]
}