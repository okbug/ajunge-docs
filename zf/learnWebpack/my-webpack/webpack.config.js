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
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "@babel/preset-env",
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