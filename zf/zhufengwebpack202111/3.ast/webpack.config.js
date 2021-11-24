const path = require('path');
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    devtool: false,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                            [path.resolve(__dirname, 'import.js'), {
                                //指定要按需加载的模块
                                "libraryName": "lodash",
                                //按需加载的目录，默认是lib
                                "libraryDirectory": ""
                            }],
                            [path.resolve(__dirname, 'showPositon.js')]
                        ]
                    }
                }
            }
        ]
    }
}