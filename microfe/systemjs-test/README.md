通过Webpack将react应用打包成systemjs模块，并且在浏览器中加载模块

先通过终端在项目中安装以下包
```bash
npm install webpack@5.17.0 webpack-cli@4.4.0 webpack-dev-server@3.11.2 html-webpack-plugin@4.5.1 @babel/core@7.12.10 @babel/cli@7.12.10 @babel/preset-env@7.12.11 @babel/preset-react@7.12.10 babel-loader@8.2.2
```


新建 `webpack.config.js` 文件
内容如下
```js
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "index.js",
    path: path.join(__dirname, "build"),
    libraryTarget: "system"
  },
  devtool: "source-map",
  devServer: {
    port: 9000,
    contentBase: path.join(__dirname, "build"),
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: false
    })
  ],
  externals: ["react", "react-dom", "react-router-dom"] // 这里输入需要不打包的包，也就是在index.js中import的库
}

```

然后新建文件夹 src
在src目录下新建index.js和index.html两个文件

```js
// index.js
import React from "react"
import ReactDOM from "react-dom"
import App from "./App.js"

// console.log(React)

ReactDOM.render(<App />, document.getElementById("root"))

// App.js
import React from 'react'

const App = () => <div>Hello App</div>
```

----

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script type="systemjs-importmap">
    {
      "imports": {
        "react": "https://cdn.jsdelivr.net/npm/react@16.7.0/umd/react.production.min.js",
        "react-dom": "https://cdn.jsdelivr.net/npm/react-dom@16.7.0/umd/react-dom.production.min.js",
        "react-router-dom": "https://cdn.jsdelivr.net/npm/react-router-dom@5.2.0/umd/react-router-dom.min.js"
      }
    }
  </script>
  <script src="https://cdn.jsdelivr.net/npm/systemjs@6.8.0/dist/system.min.js"></script>
</head>
<body>
  <div id="root"></div>
  <script>
    System.import("./index.js")
  </script>
</body>
</html>
```