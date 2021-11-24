## 1.给 webpack命令传参
- 通过命令行 webpack --watch
- 通过配置文件 watch:true


## 1.老师，bundle、chunk怎么理
- 后面给大家实现过程
- 分析入口，分析依赖，生成模块，生成chunk,生成bundle
- 每个入口一般来说会生成一个chunk,一个代码会生成一个bundle打包的资源文件)

## 2.hash,chunkhash ,contenthash 又什么区别？
- md5

## 3.热更新的配置问题
- 
- html的热更新
- js的热更新
- css的热更新
## 
- webpack 没有bundle这个概念的
- assets 产出的资源文件

那A和B共用一个模块呢，chunk就粘在一起了？
assets和chunk是一对一吗？
a.js 引入了 b.js ， b.js 引入了c.js, c.js 引入了a.js 会出现循环引用的问题么？


打包后的文件分类放好，
图片放images文件夹，css放css文件夹里面，那此时css里面的引用图片地址就会报错
