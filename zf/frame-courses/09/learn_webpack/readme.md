##  webpack是基于 node（express）

##  webpack的功能
   - 代码转化 ts->js  css  less scss
   - 文件优化 压缩 css js html； 转化图片
   - 模块化 
   - 自动更新 代码更改页面自动更新  

## 模块化规范  
 <!--凡是配置文件  commonjs规范 ；业务代码基本都是 esModule -->
commonjs规范 node   require   module.exports  可以省略 .json 和.js
esModule  浏览器支持的  import   export


## 文件夹初始化成一个项目  
npm init -y 
 - 安装webpack 和 webpack-cli  npm i webpack  webpack-cli  或者  yarn add webpack  webpack-cli

 yarn add xxx -S 或者 yarn add xxx 是把包体现在  dependencies  生产依赖
 yarn add xxx -D                   是把包体现在  devDependencies  开发依赖

//安装完node之后 自带的是 npm      npm i yarn -g 全局安装yarn

// npm install cnpm -g --registry=https://registry.npm.taobao.org



## src下的 index.js 是 webpack默认的打包入口


yarn add jquery@1.20.2