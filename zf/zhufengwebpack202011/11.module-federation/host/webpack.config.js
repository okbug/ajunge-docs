let path = require("path");
let webpack = require("webpack");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        publicPath: "http://localhost:8000/",
    },
    devServer: {
        port: 8000
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-react"]
                    },
                },
                exclude: /node_modules/,
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template:'./public/index.html'
        }),
        new ModuleFederationPlugin({
            name:'host',
            filename:'remoteEntry.js',
            remotes:{
                remote:'remote@http://localhost:3000/remoteEntry.js'
            },
           shared:{
                react:{singleton:true},
                'react-dom':{singleton:true}
            }
        })
    ]
}
/**
 * 这样子是不是，在这个项目里面，既可以用vue,又可以用react 
 * 微前端的现代化的实现方式，最先进的实现方法
 * 单独开课它的实现用法 和实现原理
 * 老师认为会不会成为主流呀， 以后大家都会用这个么？
 * 很有可能
 * 
 */