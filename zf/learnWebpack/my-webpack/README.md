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
  
在html中通过img标签引入
需要配置contentBase

在css中通过url() 引入


import
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

另外一种支持图片的loader叫做url-loader
它是file-loader的一种 **增强**
它能够在选项中加一个叫做limit的选项，如果一个文件大小小于这个限制，那么就转成base64的字符串，然后内嵌到HTML中
一般是 x * 1024 也就是x kb

在webpack配置中如下，我准备了一个9k的png
```js
[
    {
        test: /\.(jpg|png|gif|bmp)$/,
        use: [
            {
                loader: 'url-loader',
                options: {
                    name: "[hash:10].[ext]",
                    limit: 10240 // 10kb
                }
            }
        ]
    }
]
```

那么打包之后，图片就是会以base64的格式添加到网页中。

使用img标签导入图片的话
需要给html文件添加一个html-loader
这样才可以解析img中src的相对路径，并且转化为绝对路径

## webpack对JS的兼容做处理

我们知道babel是可以对ES6及其以上的JS代码做一个向下兼容的转换

安装依赖
`npm install babel-loader @babel/core @babel/preset-env @babel/preset-react @babel/polyfill -D`
`npm install @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties -D`

babel-loader使用Babel和webpack转译JavaScript文件
@babel / @babel/core Babel编译的核心包
@babel/preset-env 为每个环境预设的配置
@babel/@babel/preset-react React插件的Babel预设
@babel/plugin-proposal-decorators把类和对象装饰器编译成ES5
@babel/plugin-proposal-class-properties转换静态类属性以及使用属性初始值化语法声明的属性

webpack配置

```js
[
    {
        test: /\.jsx?$/,
        use: [
            {
                loader: "babel-loader",
                options: {
                    presets: [
                        "@babel/preset-env",
                        "@babel/preset-react"
                    ]
                }
            }

        ]
    }
]
```

然后安装react和react-dom
`npm install react react-dom -S`
在index.js中写一个React组件

```js
import React from 'react'

import ReactDOM from 'react-dom'

function App() {
    return (<>
        <h1>App</h1>
    </>)
}

ReactDOM.render(<App />, document.getElementById("app"))
```
打包比之前多了七秒钟
并且可以渲染出React组件
main.js文件内容增加

支持装饰器
装饰器的语法都是在提案中，如果要我们直接支持，需要在项目中添加一个jsconfig.json文件
在里面写入选项
```js
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}
```
首先我们在index.js中写
```js
// target 装饰的目标
// key 装饰的属性
// desc 配置 

function readonly (target, key, desc) {
    desc.writable = false
}

class Person {
    @readonly PI = 3.14
}

let p = new Person()
p.PI = 3.15
console.log(p)
```

这是装饰器的语法
但是babel并不支持该语法
那么我们在options中添加以下代码：
```js
[
    {
        options: {
            plugins: [
                ["@babel/plugin-proposal-decorators", {legacy: true}],
                ["@babel/plugin-proposal-class-properties", {loose: true}]
            ]
        }
    }
]
```
上面的代码就可以成功被打包

**预设是插件的集合，预设里面就是把很多插件打包在一起了**


legacy 遗弃
loose 宽松，如果为false，那么会采用Object.defineProperty


options中，presets字段也可以通过传一个数组（第一项为预设名字的字符串，第二项是该预设的配置）
与上面的plugins类似

兼容ES6的语法

在index.js中，如果需要使用Promise的话，那么可以通过
`require("@babel/polyfill")`
的方法
但是导入之后打包代码多了特别特别多
所以我们可以想到：

**按需加载**

如何按需加载？

在webpack配置中
presets中加入一个useBuiltIns选项 然后指定浏览器的版本

```js
[{
    presets: [
    ["@babel/preset-env", {
        useBuiltIns: 'usage', // 按需加载polyfill
        corejs: {version: 3}, // 指定corejs的版本
        targets: { // 指定要兼容哪些浏览器
            chrome: '60',
            firefox: "60",
            ie: '9',
            safari: "10",
            edge: "17"
        }
    }],
    "@babel/preset-react"
],
}]
```




## ESLint代码校验

安装依赖
`npm install eslint eslint-loader babel-eslint -D`

然后在配置中，添加一个

```js
[
    {
        test: /\.jsx?$/,
        use: 'eslint-loader',
        enforce: "pre", // 强制指定顺序，这个是之前的意思
        // 这个会默认先触发，然后将转化后的代码传给下一个rule
        options: {fix: true}, // 启动自动修复
        exclude: /node_modules/, // 排除不需要检验的代码
        // 或者include: resolve("src") // 只检测这里的代码
    },
]
```

配置了 `enforce: "pre"` 的规则会优先匹配

webpack自带一个插件叫做ProvidePlugin
```js
plugins: {
    new HtmlWebpackPlugin({
        template: './src/index.html',
    }),
    new webpack.ProvidePlugin({
        _: 'lodash' // 相当于全局引入lodash 所有文件都可以使用
    })
}
```

# webpack 中的loader和plugin
## loader
expose-loader
将模块信息提前放到全局里面


## plugin
html-webpack-externals-plugin
和externals选项类似，不需要手动在模板中引入cdn
use: 

```js
new HtmlWebpackExternalsPlugin({
    externals: {
        module: 'lodash',
        entry: '//cdn.com/lodash.js',
        global: '_',
    }
})
```

definePlugin
定义全局常量

```js
new webpack.definePlugin({
    ...options
})
```