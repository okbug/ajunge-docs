## 模块的ID
- 不管你是用什么样的路径来加载的，最终模块ID统一会变成相对根目录的相对路径
  - index.js ./src/index.js
  - title.js  ./src/title.js
  - jquery  ./node_modules/jquery/dist/jquery.js


## npx和webpack和npm run build这三个命令都有啥关系？ 


import('./title.js').then() 


    //为了要用一个字母，因为减少打包后的文件体积
    //__webpack_require__ w
    //__webpack_require__ exports definition都可以在代码压缩阶段会压缩成一个字母
    //对象的属性名是不能被压缩的

那这些用一个字母来代替 有固定的意义的？.d 代表什么  .w 又代表什么？   
没什么意思
26个字母  

##  文字总结
- common+common 不需要任何处理
- common+es6 es6需要转成commons
- es6+es6 两个es6都要转成commons
- es6+common es6转成common



hello 如果动态加载了一个其他磨块，  chunkids的数量是多少 ?

/// yarn tyarn
// npm cnpm 
// nrm 

没听到npx和webpack和npm run build三个命令的关系？ 

npx 是webpack5添加的新的命令
不本地安装软件包的情况执行相信的命令
npx webpack 

cnpm i webpack
npm run run build

webpack是编译核心包
webpack-cli是webpack的命令行工具
npm run build => webpack-cli里的 webpack命令，webpack命令会调用webpack核心包去进行编译

yarn和npm装的有什么区别 。有npm为什么还需要yarn 
