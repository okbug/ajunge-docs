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
                        loader: 'file-loader',
                        options: {
                            name: "[hash:10].[ext]"
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