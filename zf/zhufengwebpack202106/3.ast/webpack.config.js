const path = require("path");
module.exports = {
    mode: "development",
    devtool:false,
    entry: "./src/index.js",
    output: {
        path: path.resolve("dist"),
        filename: "main.js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        plugins: [
                             //["import", {"libraryName": "lodash"}]
                              [
                              path.resolve(__dirname,'plugins/babel-plugin-import.js'),
                              {
                                libraryName:'lodash'
                              }
                            ] 
                        ]
                    }
                },
            },
        ],
    },
};