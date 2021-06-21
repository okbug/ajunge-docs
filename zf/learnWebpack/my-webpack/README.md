webpack只能识别JS和JSON文件

# webpack中的配置项详解

webpack5已经默认支持无配置打包了，就是会默认解析src下面的main.js或者index.js 并且打包到dist目录下的main.js中
但是需要配置，就在package.json中的scripts中启动webpack的命令中加入 `--config xxx.config.js`，或者是在根目录下放置webpack.config.js文件

## 简单的配置

```js
const path = require("path")

const resolve = (...args) => path.resolve(__dirname, ...args)

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: resolve('dist'),
        filename: 'main.js'
    }
}
```

在scripts中添加一条`"builld": "webpack"`
然后运行 `npm run build` 就可以成功将其打包

## loader
如果要识别TXT之类的，得下载raw-loader等等
raw是原生的意思，其实就是将文本直接返回出来

### raw-loader的实现

```js
function loader(source) {
    // source 是 资源被fs读取后解析的字符串
    return `module.exports = ${JSON.stringify(source)}`
}
module.exports = loader
```

这样就是一个简单的raw-loader。

如何调用它？
更改webpack.config.js配置
```js
const path = require("path")

const resolve = (...args) => path.resolve(__dirname, ...args)
// const rawLoader = require("./my-loaders/raw-loader")

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: resolve('dist'),
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.txt$/,
                use: resolve("my-loaders", "raw-loader.js")
            }
        ]
    }
}
```

那么在index.js中 可以require一个txt的文件并且读取到里面的内容

## plugin


安装一个插件
`npm install html-webpack-plugin -D`

然后在配置的module下面，添加一个叫做 `plugins` 的选项，它是一个数组，如下：
```js
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    ...,
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
}
```

## mode

在webpack4.0之后引入了mode的概念

- development
    默认开启各种性能优化工具，提升构建的结果优化和运行的性能优化

- production
    开启debug工具，运行打印的详细错误信息，提升编译构建速度


# webpack-dev-server的配置

安装
`npm install webpack-dev-server -D`

然后配置scripts脚本：
`"start": "webpack serve"`
如果是webpack4的话是webpack-dev-server
webpack5的话是执行 `webpack serve` 
然后在webpack的配置文件中，加上：
```js
module.exports = {
    ...,
    devServer: {
        contentBase: resolve("dist"),
        compress: true, // 是否启动压缩功能
        port: 8080, // 端口号
        open: true, // 是否自动打开默认浏览器,
        writeToDist: fasle // 是否要在磁盘中生成文件
    }
}
```

devServer会启动一个HTTP服务器，把一个文件夹作为静态资源的根目录
由于webpack-dev-server为了提高性能而将打包后的文件写入到内存中，使用了内存文件系统
所以 `writeToDist` 默认为false

contentBase 详解：
[官网](https://webpack.js.org/configuration/dev-server/#devserver)
默认会解析前面的output的入口路径
然后如果有写其他路径，也可以获取到那个路径下的文件
比如写了一个叫做public或者static的路径，将其作为contentBase的路径，那么在这个路径里的文件都是可以通过devServer访问到的

devServer 和 output 中有选项叫做 publicPath （mark）

## webpack对css的处理
先安装 style-loader css-loader
`npm install style-loader css-loader -D`

在module的rules中加一条
```js
[
    {
        test: /\.css$/,
        use: ["style-loader", "css-loader"] // use如果写一个数组的话，那么这里写的loader，需要从右往左解析
    }
]
```

style-loader是将脚本插入到html文件中的style标签中，css-loader是解析css文件，以及 @import， url() 等属性

### 对sass和less 的处理

安装依赖
`npm install less less-loader node-sass sass-loader -D`

添加两个rule
```js
[
    {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"]
    },
    {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
    }
]
```

直接添加所需的loader在最后面即可


## webpack支持图片

在webpack中使用图片
三种方式：
直接import or require
安装 file-loader url-loader html-loader
`npm install file-loader url-loader html-loader -D`

配置
```js
[
    {
        test: /\.(jpg|png|gif|bmp)$/,
        use: ["file-loader"]
    }
]
```

使用了file-loader后，可以将这个文件放入dist目录，文件默认是一个hash+[ext] 的形式，想要其他的文件名可以在use中添加配置
```js
[
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
```

在js中写入以下代码
```js
let logo = require("./images/img.png")
let image = new Image()
image.src = logo.default;
document.body.appendChild(image)
// 如果不要写logo.default
那么要在use的options写一个esModule: false即可
// 默认是true，即需要取返回对象中的default属性
```