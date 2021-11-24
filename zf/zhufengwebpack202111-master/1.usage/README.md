## 资料地址
- 代码
https://gitee.com/zhufengpeixun/zhufengwebpack202111 
- 课件 
http://www.zhufengpeixun.com/strong/html/103.1.webpack-usage.html
- 上课进度
https://docs.qq.com/sheet/DSmh3Z0dTVGRBa2p3 
- 视频地址 https://www.javascriptpeixun.cn/goods/show/445
  - 上一期  第2章 202108
  - 这一期  第1章 202111

## 大纲
- webpack5安装的基本使用
- 入口、输出、loader、plugin、mode模式
- 开发环境配置
  - 开发服务器
  - 支持CSS
  - 支持less sass
  - 处理CSS兼容
  - 处理JS和JS兼容
  - 如何配置使用图片等静态资料
  - eslint代码校验
  - sourcemap
  - 打包第三方包
  - 拷贝静态文件
  - 如何配置服务器代码
- 生成环境配置
  - 压缩JS CSS HTML
  - 提取单独CSS文件

 ## 核心概念
 - webpack默认配置文件是`webpack.config.js`
 - 入口 指示webpack应该从哪个文件开始打包，用来作为内部依赖的图构建的起点 
   - 在webpack5里，如果没有额外配置的话，入口文件就是`src\index.js  `
 - loader
   - webpack默认情况下只能处理和理解javascript和json文件
   - 如果要想引入其它类型的文件，比如css,需要对源文件进行加载和转换，转成JS  
   - 比如说处理css文件 ['style-loader', 'css-loader']，从右向左执行的
   - 1.先读出源文件 index.css
   - 2.把文件内容传递给css-loader,css-loader可以处理css中的@import和url语法,,处理完之后会把内容传递给style-loader
   - 3.style-loader的作用是把CSS转换成style标签插入页面中
- 插件 插件可以执行范围更广的任务
- mode 代表当前编译 的环境
  - none 未指定
  - production 生产环境 webpack会针对构建结果进行生成环境的优化 默认值
  - development 开发环境 webpack不会对代码进行压缩
  - 日常项目开发中，我们会有两套环境
  - 一套是开发环境 用于开发时使用，构建结果用于本地的开发调试，不压缩代码，打印日志，包含sourcemap文件
  - 一套是构建后直接上线的 代码一般都是压缩后，不打印LOG，静态文件也不包含sourcemap
  - webpack4之后引入mode概念

- 如何动态设置不同的环境
  - --mode用来设置模块内的`process.env.NODE_ENV`
  - --env用来设置webpack配置文件的函数参数
  - cross-env用来设置node环境的process.env.NODE_ENV
  - DefinePlugin用来设置模块内的全局变量,可以用于模块内的字符串替换

mode
 - production 如果设置为production，webpack会默认启动一些生产环境插件 比如压缩JS
 - development 如果设置为development，webpack会默认启动一些开发环境插件 比如说sourcemap
 - none 如果设置为none,当前webpack不会启动任何额外的插件


- mode的设置会影响 模块里 proces.env.NODE_ENV 的值

node_modules\webpack\bin\webpack.js
//mode优先级
默认优先级(production) < 配置文件webpack.config.js里的mode < package.json中的--mode的配置
webpack会在编译 阶段把`process.env.NODE_ENV`替换成对应的值



ERROR in ./src/index.css 1:4
Module parse failed: Unexpected token (1:4)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
> body{
|     background-color: green;
| }

'style-loader', 'css-loader'



## webpack-dev-server开发服务器的原理
- 也是会用webpack从入口文件进行打包，然后输出到输出目录，这个输出是输出的内存文件系统里去了
- 然后会启动http服务器预览我们的项目 



less 用于把less编译成CSS
less-loader 
node-sass 用于把sass编译成CSS
sass-loader

background-image: url(~image/kf.jpg);
//为了引入node_modules下面的资源文件，比如说bootstrap，可以添加 ~前缀


CSS兼容 性和importLoaders
importLoaders 允许或者说启动几个数量的loaders应用在import 的文件


webpack4 关于图片需要 使用file-loader url-loader 
webpack5 不再需要
file-loader=>asset/resource 把图片拷贝到输出目录里去，返回一个输出后的路径，包括文件
url-loader=>asset/inline 不拷贝文件，直接把源文件变成base64字符串内嵌到输出结果

js兼容性
polyfill preset-env preset-react
eslint
eslint prettier git hooks 放在一起
source可以放在一起


1.直接引入
每次使用都需要手工导入
2.插件引入
如果使用webpack.ProvidePlugin插件引入的话，则不再需要你在模块手工引入
3.但在没有全局变量，你在模块外是不能访问的
如果想在任何地方访问此变量，需要把此变量设置为环境变量 `window.isarray`
expose-loader 可以把模块添加到全局对象上
以上三种方式，都需要打包库的代码，不能使用CDN

