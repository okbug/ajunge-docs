- node老版本里有全局依赖
- node新版本里已经不推荐使用了


如果你导出的内容只有一项的话 commonjs2
如果你导出的内容有多项的话，只能commonjs

exports.xxx

module.exports = 
exports.xx


module.exports 就是 export default
exports.xx 就是export {
    
}

libraryExport如果不能就导出整个exports对象
如果给了就导出指定的子属性


14:19
135****5238
提取css的插件是和 speed那个插件一起用会报错 
水星
html的压缩就是自己压缩，不和js和css一起 


## CDN
- HTML放在自己的服务器上，不缓存，关闭服务器缓存，每次访问服务器都可以获取最新的资源
- 里面的静态文件js css image都指向CDN的地址
- js css image都放在CDN上，并且文件名带上hash值
- 为了可以并行加载，需要把不同类型的文件和不同的文件放在不同的CDN服务器上
- 为了避免同一时间对同一个域名请求数并发的限制，不同的资源放在不同的域名服务器进行并行加载
- dns-prefetch DNS预解析



hash代表整个项目
vendor.4305adaee27b2a3244e5.js
main.4305adaee27b2a3244e5.js
style/main.4305adaee27b2a3244e5.css


chunkhash
每个入口都有自己的chunkhash
如果本入口对应的文件发生改变，chunkhash会改变，如果没有改变，chunkhash会保持不变

webpack treeshaking 虽然有很大改进，但是相对于rollup，还是差点
手写rollup和treeshaking过程


在webpack5的默认情况下
src_three_js.js
其实就是模块的相对路径 /换成_,把.换成_

开发的时候 可以使用named方便阅读和调试
生产环境的时候，使用named就不太合适了
1.太长 2.信息泄露

生产环境 用名字计算出来的hash值
生产环境以前是数字 1 2 3 ，webpack5以事
deterministic 
根据模块名生成的hash值


webpack是如何判断代码有效，需要保留的
1.你得引入
2.你得读它或者说使用它


16:15
Ys
treeshaking 需要es6 才行吗 
必须 是esm esmodules commonjs是不行的
水星
是因为没有标签用到吗？ 

