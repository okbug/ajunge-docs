Y
bootstrap对应图里的什么地方？ 
彭清瑶
为什么取值用 .default 。 
小叶子
因为是es6 module 
小叶子
es6module 被webpack转成commonjs模块会加上default 
彭清瑶
平时写代码时， 也是es6， 也没用default哪。 
export default xx
require('xx').default;
import default from 不需要加default 
await import();也需要加default
小叶子
直接写js文件，走webpack的话要default. 然后用vue是不用加default。 应该是.vue文件被编译成js文件时会转 
彭清瑶
平时把接口单独提取到js文件， 使用的话， 也没有default。。 
小叶子
接口最后在.vue里使用的吗？ 
彭清瑶
我只有在使用require.context时，取值是用default的。。 
彭清瑶
是的呢 
20:31
周丽娟
老师这个图怎么画的，很好看 
20:35
青衣
exposes中的别名为什么加. 
小叶子
temb的remote呢 
没有，
彭清瑶
remteEntry包括了其他所有打包后的js？ 
remoteEntry知道如何加载别的资源
小叶子
报错了吧 
小叶子
teamb的页面没呢？ 


徐健
那要是线上发布是要一起发布吗 
朱令超
这样是不是可以用远程组件了 
Ace
那teamb 如何独立运行呢 
彭清瑶
那这样还能做到按需加载吗？ 
小叶子
平时开发teamb的功能时，还得起teama的服务？ 
彭清瑶
平时开发时，肯定都发到服务器上了。 直接引入服务器不久得了。 
小叶子
或者用teama的dev域名，然后把teamb的js文件打到本地？ 
小叶子
dev开发，你不本地调吗？直接上服务器了 
彭清瑶
两个团队。。。。。 你管别人干啥。 
小叶子
我问的是本地调试teamb的代码 



Stephen&Joe
不是都能独立运行吗 
Stephen&Joe
你就只做自己的项目就行呗 
徐健
webpack4中可以用吗 
Stephen&Joe
只不过现在老师这个例子b不需要独立运行罢了 

这么配，只能单独测组件，没法看整个页面吧？ 
小叶子
teamA的代码，teamB没有 
aaa
这只是暴露几个组件出去给其他项目用而已吧 
aaa
自己项目还是能跑的 

小叶子
但是teamB改的组件，不好看，会影响teamA 
彭清瑶
像single-spa那种，直接引入页面， 在teama里是不是需要加个根dom？ 
朱令超
思想不错 动态远程组件
两个容器必须放在一个域名下面？ 
不需要


