let path = require("path");
let webpack = require("webpack");
let HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
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
            template: './src/index.html'
        }),
        new ModuleFederationPlugin({
            filename: 'remoteEntry.js',
            name: 'hostVariable',
            remotes: {
                remote: "remoteVariable@http://localhost:3000/remoteEntry.js"
            },
            exposes: {
                './Sliders': './src/Sliders'
            },
            shared: {
                react: { singleton: true },
                'react-dom': { singleton: true }
            }
        })

    ]
}