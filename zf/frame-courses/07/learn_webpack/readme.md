## webpack
-  webpack 就是一些配置 
-  依赖于node

#### 打包工具   webpack   gulp grunt ...

 - 代码转化   less sass  stylus  --> css ; ts --> js; 高版本JS语法转成低版本
 - 代码压缩   html css js  压缩// 换行 注释 空格全删除 把一些变量替换成比较短的单词
 - 支持模块化  模块合并
 - 自动更新  (热更新)

 #### 模块化
 commonJS 规范  node使用  require（导入 引入）   module.exports（导出）    // webpack 的配置文件
 esModule  JS语法 自支持的模块化  import(导入)   export（导出）





 ###  行内命令[https://webpack.docschina.org/api/cli/]



 
  "start":"webpack-dev-server --config config/webpack.config.js"
  想用这个命令 运行服务的时候 需要  配合 webpack-cli 3.xxx


  "start":"webpack serve --config config/webpack.config.js"
  // 这个命令匹配的是 webpack5.0  和 cli 4.0的


### webpack 层面的报错  版本问题 和 丢包问题（cant found moudlexxx   JSON.parse...）




### webpack 的优化

- 1  把webpack  和 node 升级为最新版
- 2  loader处理文件的时候 排除 node_modules中的选项
- 3  压缩css和JS  （适用于生产环境）
- 4  配置 resolve的 alias 可以提升文件的查找速度
- 5  配置 resolve.extensions 比例提升编译效率 但是有利于我们的编写速度
- 6  配置 resolve.modules  可以提升文件的查找速度  有利于我们的编写
- 7  使用 ProvidePlugin 这个内置插件，避免在使用到某些包的时候都需要引入
- 8  使用外部扩展 externals  通过cdn映入的方式 把一些补偿变动的包引入
- 9  module.noParse  构建时 忽略哪些没有任何依赖包的 模块（若使用了externals，则这个设置就没有实际价值了）
- 10 webpack.IgnorePlugin 忽略哪些没有实际引入价值的地方
- 11 多进程 老版本 happypack, 现在使用thread-loader
- 12  splitChunks  能避免一个包的体积过大
- 13  dll  动态链接库  把那些不会改变的三方包 一次性打包