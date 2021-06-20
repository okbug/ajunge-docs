webpack只能识别JS和JSON文件

# webpack的配置

webpack5已经默认支持无配置打包了，就是会默认解析src下面的main.js或者index.js 并且打包到dist目录下的main.js中
但是需要配置，就在package.json中的scripts中启动webpack的命令中加入 `--config xxx.config.js`，或者是在根目录下放置webpack.config.js文件

// 简单的配置
```js
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  mode: '‘
}
```

# webpack的loader
如果要识别TXT之类的，得下载raw-loader等等
raw是原生的意思，其实就是将文本直接返回出来
raw-loader的实现

```js
function loader(source) {
  // source 是 资源被fs读取后解析的字符串
  return `module.exports = ${source}`
}
```

这样就是一个简单的raw-loader。
