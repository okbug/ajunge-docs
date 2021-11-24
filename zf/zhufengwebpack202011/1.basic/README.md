## webpack学习的顺序
- webpack5实战使用
- webpack优化
- webpack工作流  AST抽象语法树
- loader
- plugin tapable
- hmr 手写实现完整原理

## 
- 在现代软件开发中，分包分包是一个非常重要的思路
- 把一个大仓库尽可能拆分成不同的不同的小仓库，不同的模块 lerna 
- webpack webpack-cli webpack-dev-server


## 引入图片的方式
- 放在静态文件根目录里，通过html中的image直接引用，需要配置`devServer.contentBase`
- 通过 require import 引入
- 可以在CSS中通过  url 引入图片  css-loader来进行解析处理

## url-loader和file-loader
- url-loader是对file-loader的增强
- 判断图片的大小是否大于limit,如果大于的话就会把工作交给file-loader处理
- 如果是小于的话，就转成base64自己处理

##  file-loader只是拷贝过去吗？不是吧img处理城js模块吗？
file-loader 
1.拷贝图片
2.把图片模块变成JS模块

## 为什么安装了babel-loader还要安装env，babel-loader不包括这些吗 

- babel-loader 默认换器
- babel-core
- babel-preset-env


##
- legacy 和loose 参数?
- @babel/preset-env 参数


## 1. path的区别和联系？
- publicPath可以看作是devServer对生成目录`dist`设置的虚拟目录，devServer首先从devServer.publicPath中取值，如果它没有设置，就取 `output.publicPath`的值作为虚拟目录，如果它也没有设置，就取默认值 `/`
- `output.publicPath`不仅可以影响虚拟目录的取值，也影响利用`html-webpack-plugin`插件生成的index.html中引用的js、css、img等资源的引用路径。会自动在资源路径前面追加设置的output.publicPath
- 一般情况下都要保证`devServer`中的`publicPath`与`output.publicPath`保持一致


|类别|配置名称|描述|
|:----|:----|:----|
|output|path|指定输出到硬盘上的目录|
|output|publicPath|表示的是打包生成的index.html文件里面引用资源的前缀|
|devServer|publicPath|表示的是打包生成的静态文件所在的位置(若是devServer里面的publicPath没有设置，则会认为是output里面设置的publicPath的值)|
|devServer|contentBase|用于配置提供额外静态文件内容的目录|

## 2.legacy 和loose 参数
- [babel-plugin-proposal-decorators](https://babeljs.io/docs/en/babel-plugin-proposal-decorators)
- legacy 使用旧的(stage 1的装饰器语法和行为)
- [babel-plugin-proposal-class-properties](https://babeljs.io/docs/en/babel-plugin-proposal-class-properties)


## 测试环境和开发环境没有布署map文件，如何进行源码调试?
## babel-runtime?
## pre commit husky ?

## 引入第三方库的时候
- 1.直接引入 痛点是比较麻烦，每次都要引
- 2.插件引入  方便点是不需要手工引了，直接 就能用。缺点是无法在全局下使用
- 3. expose-loader引入
- 4 CDN 需要我们手工的导入插件CDN脚本，而且不管代码里用到没有用到，我们都会引入


## 疑问解答
- 环境变量配置 1.6 模式(mode)
 - 两个变量 一个是在模块内部使用的变量,一个是在node环境也就是webpack.config.js里面用的变量
 - 1.命令行配置
     - webpack执行时候，mode默认值是production,它模块内可以读到，
     - 可以通过--mode=development来改变mode值
     - 可以通过--env=development传参，传给webpack配置文件中导出的函数参数env了
mode=>   模块内的process.env.NODE_ENV
DefinePlugin设置也是模块的全局变量

process.env.NODE_ENV cross-env的设置

- babel-runtime? 2.5.2 babel-polyfill
1.转换ES6的语法
全量引入@babel/polyfill
asset main.js 476 KiB
entry
asset main.js 747 KiB
usage
 main.js 363 KiB
runtime
 asset main.js 771 KiB [

     是否需要提取一些类的继承的帮助 方法helper=true提取成单独的模块，如果是false不提取
     
- sourcemap调试 2.7.4 组合规则
- pre commit husky ? 4.1 git规范和changelog
## 配置文件写法

- 一般都会有四到五种
- .postcssrc
- postcss.config.js
- postcss.config.json
- 直接写在webpack.config.js里

## loader的执行顺序
- 从右向左 从下向上
- use:[1,2,3]   执行的时候从 3 2 1

Mode只能影响模块内的process.env.NODE_ENV吧 
stair


sideEffects副作用配置怎么用呢 
Browserlist  要根据产品决定，

tree-shaking 在wp5变的强大
但是有些时候可能会把一些不该优化的优化掉了，比如css
讲的实战配置  优化和原理
tree-shaking单独讲一节课的？

mode=production,就不需要再自己配置TerserPlugin
mode=development,还要想压缩，就得配置TerserPlugin


## 我说的是terser-plugin和production压缩js的效果是差不多吗 ？
mode=production的话会启动terser-plugin进行压缩
mode=development的话，内部不会自动启用terser-plugin,你要还想压缩就得自己配terser-plugin

Px2rem会调用Lib-flexible来把px转成rem？不对的

- px2rem 只是把px转成rem 
:750px => 10rem

- lib-flexible 动态计算根元素的font-size值

怎么配置多个webpack文件不讲一下吗 ？
我们周五hash是不是没讲完，只讲了区别 
 webpack-merge
 .env.xxx文件 
 husky还讲吗 



1.用chunkhash的话，改了CSS，是不是JS的hash也会变？ 
会的，只要是同一个chunk,任意一个模块改变， chunkhash就会改变
2.如果 用了import（） 动态引入，import，内容发生了变化。 chunkhash 也会发现变?
import()动态代码分割，分生成一个独立的代码块

chunkhash计算的时候用的是模块的ID
main page1.js page2.js main hash = hash(page1.js+page2.js)
不需读文件内容，而且内容特别小
contentHash   hash(page1的文件内容)


//如果内容变化的非常快 建议hash 生成是的。单 入口就用hash
//如果是多个入口，建议chunkhash
//如果需要长期缓存的，而且 确定变化不大的contenthash的

入口模块依赖的模块组成一个chunk