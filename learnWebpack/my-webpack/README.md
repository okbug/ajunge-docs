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

webpack的entry 可以是一个对象，有更多的配置

```js
entry: {
    main: 'src/index.js'
}
```

----

bundle chunk
bundle意思是打包后的资源文件，每个入口(entry) 生成一个代码块(chunk) 就是bundle文件
每一个chunk就是一个文件 以及它所依赖的那些模块 加在一起的代码块
----

hash chunkHash contentHash
hash: 每次构建会生成统一hash
chunkHash 代码块hash 每个代码块共享一个hash值
contentHash 内容哈希，根据文件的内容生成的hash（内容变了，这个hash才会变）
----

## splitChunks
等待补充

# webpack 中的loader和plugin
## loader
style-loader
将样式添加到html中
```js
function loader(cssSource) {
    return `
        let style = document.createElement('style');
        style.innerHTML = ${cssSource}
        document.head.appendChild(style);
    `
}
```


expose-loader
将模块信息提前放到全局里面
```js
rules: [
      {
        test: require.resolve("jquery"),
        loader: "expose-loader",
        options: {
          exposes: ["$", "jQuery"],
        },
      },
]
// import $ from 'jquery';
```


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

copyWebpackPlugin
拷贝文件夹或文件

```js
const copyWebpackPlugin = require('copy=webpack-plugin');
new copyWebpackPlugin({
    patterns: [
        {
            from: resolve('src/fonts'),
            to: resolve('dist/fonts'),
        }
    ]
})
```

cleanWebpackPlugin
在重新构建前 先删除在output目录下的原有文件
```js
const { cleanWebpackPlugin } = require('clean-webpack-plugin');

new cleanWebpackPlugin({
    cleanOnceBeforeBuildPatterns: ["**/*"]
})
// * 匹配任意字符， ** 类似递归匹配，所有文件夹下面的文件
```

mini-css-extract-plugin
把css单独分离出来加载

```js
rules: [ // 用miniCssExtractPlugin.loader 替换掉 style-loader
    {
        test: 'css',
        use: [miniCssExtractPlugin.loader, 'css-loader']
    }, {
        test: 'less',
        use: [miniCssExtractPlugin.loader, 'css-loader', 'less-loader']
    }, {
        test: 'scss',
        use: [miniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
    }
],
plugins: [
    new miniCssExtractPlugin({
        filename: '[name].css'
    })
]
```

----------


webpack proxy
可以作为反向代理 （跨域等作用）
使用
```js
devServer: {
    proxy: {
        '/api': 'http://api.com/api',// 访问/api/xxx 等于访问这个域名的这个路径，可以重写
        '/api2': {
            target: 'http://api.com.api',
            pathRewrite: {
                '^/api': '' // 这样访问 /api/xxx 等于 api.com/xxx
            }
        }
    }
}
```

webpack-dev-server 就是基于 `express` 启动的
那么在配置中也可以体现这一点
```js
devServer: {
    before(app) { // 这里的app就是 express() 执行后的app
        app.get('/api/xxxx', (req, res) => {
            res.json({data: 'data'})
        })
    }
}
```


webpack-dev-middleware
这个会返回一个express中间件，和webpack-dev-server有点相似
使用
```js
// 1.js
const app = express();
const webpackConfig = require('webpack.config.js')
const compilerResult = webpack(webpackConfig);
app.use(webpackDevMiddleWare(compilerResult, {}))
```








## webpack-merge

`npm install webpack-merge`

可以实现对配置的合并

```js
const { merge } = require('webpack-merge');
const config1 = {...xxx};

module.exports = merge(config1, {
    ...otherConfig
})
```

类似Object.assign 或者是 spread运算符

# webpack 打包文件分析

首先安装几个工具
(从零开始新建一个项目)
`npm install webpack webpack-cli html-webpack-plugin clean-webpack-plugin -D`

基础配置

```js
// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
    },
    module: {},
    plugins: [
        new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: ['**/*'] }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        })
    ],
    devServer: {},
}
```

并且根据配置添加index.html和index.js,并且在package.json中添加scripts
[代码](https://github.com/okbug/ajunge-docs/pull/1/commits/b9ba6f04aa3084d9d67c99bf7e4b04d62e751cd8)

什么是模块ID，在打包前的代码中涉及到路径(比如 `import xx from './xxx.js'` 或者 `import Vue from 'vue'`)
模块ID就是: './src/xx/js', './node_modules/vue/dist/vue.min.js'

样例代码：

```js
// index.js

import title form './title.js';
console.log(title)；

// title.js

const title = 'Hello, World';

export default title;
```

生成的代码如下

```js
(() => {
  "use strict";
  var __webpack_modules__ = {
    "./src/title.js": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.r(__webpack_exports__);
      __webpack_require__.d(__webpack_exports__, {
        default: () => __WEBPACK_DEFAULT_EXPORT__,
      });
      const title = `Hello, World`;
      const __WEBPACK_DEFAULT_EXPORT__ = title;
    },
  };
  var __webpack_module_cache__ = {};
  function __webpack_require__(moduleId) {
    var cachedModule = __webpack_module_cache__[moduleId];
    if (cachedModule !== undefined) {
      return cachedModule.exports;
    }
    var module = (__webpack_module_cache__[moduleId] = {
      exports: {},
    });
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
    return module.exports;
  }
  (() => {
    __webpack_require__.d = (exports, definition) => {
      for (var key in definition) {
        if (
          __webpack_require__.o(definition, key) &&
          !__webpack_require__.o(exports, key)
        ) {
          Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key],
          });
        }
      }
    };
  })();
  (() => {
    __webpack_require__.o = (obj, prop) =>
      Object.prototype.hasOwnProperty.call(obj, prop);
  })();
  (() => {
    __webpack_require__.r = (exports) => {
      if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
        Object.defineProperty(exports, Symbol.toStringTag, {
          value: "Module",
        });
      }
      Object.defineProperty(exports, "__esModule", { value: true });
    };
  })();
  var __webpack_exports__ = {};
  (() => {
    __webpack_require__.r(__webpack_exports__);
    var _title_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/title.js");

    console.log(_title_js__WEBPACK_IMPORTED_MODULE_0__["default"]);
  })();
})();

```


跳过ESModule

再看CommonJS的代码解析的样子

源码:

```js
// index.js
const title = require('./title.js');

console.log(title);

// title.js
module.exports = 'title';
```

打包后的代码：
```js
(() => {
  var __webpack_modules__ = {
    "./src/title.js": (module) => {
      module.exports = "title";
    },
  };
  var __webpack_module_cache__ = {};

  function __webpack_require__(moduleId) {
    var cachedModule = __webpack_module_cache__[moduleId];
    if (cachedModule !== undefined) {
    }
    var module = (__webpack_module_cache__[moduleId] = {
      exports: {},
    });
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
    return module.exports;
  }
  var __webpack_exports__ = {};
  (() => {
    const title = __webpack_require__("./src/title.js");
    console.log(title);
  })();
})();

```

从零开始实现以上这样杂乱无章的代码。
首先新建一个html文件和一个空的js文件，通过这两个文件来模拟这个过程。(文件夹: `1.sync`)

先通过调试代码来查看代码的运行逻辑
[commit](https://github.com/okbug/ajunge-docs/pull/1/commits/95312a6600cc867f25c48668b3c5bb86b33f378f)




为什么`__webpack_require__` 这样的变量不压缩，而要压缩 `__webpack_require__` 下面的 `r/d/o` 等方法呢？

在做最后压缩的uglify时，这些变量都可以压缩，但是对于属性的访问没办法压缩（默认不压缩）

所以在development模式下面保留.r .d .o 等方法的缩写

pull requlest 1 告一段落







## webpack中的tapable

这是一个类似发布订阅的库


```js
import { SyncHook } from 'tapable'

let syncHook = new SyncHook();

// tab就是发布订阅中的on 参数是 eventName和cb

syncHook.tap('just a name', (payload) => {
    console.log('callback', payload);
})

// call就是触发回调，并且可以作为参数，并且不用传入eventName

syncHook.call('zhufeng')
```

### 实现tapable


最简版

```js
class SyncHook {
    constructor() {
        this.taps = [];
    }

    tap(name, fn) {
        this.taps.push(fn);
    }

    call(...args) {
        this.taps.forEach(tap => tap(...args))
    }
}
```

