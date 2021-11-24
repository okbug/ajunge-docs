

let loaders = [
    path.resolve(__dirname,'loaders','post-loader1.js'),
    path.resolve(__dirname,'loaders','post-loader2.js'),
    path.resolve(__dirname,'loaders','inline-loader1.js'),
    path.resolve(__dirname,'loaders','inline-loader2.js'),
    path.resolve(__dirname,'loaders','normal-loader1.js'),
    path.resolve(__dirname,'loaders','normal-loader2.js'),
    path.resolve(__dirname,'loaders','pre-loader1.js'),
    path.resolve(__dirname,'loaders','pre-loader2.js')
]

没有感觉到pre-loader, normal,inline,post 的区别呀 
张胤撤回了一条消息
岁月小小
/\.less/ 的style-loader , css-loader, less-loader 
黄鹏
loader本身是没差别的，差别在于执行的顺序
放的位置不一样，执行的顺序 不一样。loader本身是一样的
line, 和normal 的区别呢。 
杨康
感觉和配置有关，和loader本身代码没有关系 
14:32
杨康
我实际中npm不同的loader，再node-module里怎么找到？ 
找法和找node普通模块的基本是一样的 
岁月小小
inline呢？ 
岁月小小
webpack的配置里不会有Inline   loader 吗？ 
黄鹏
inline-loader , 是指我们在自己代码写的loader 么？ 

为啥是从下向上执行还是不太明白 
毛子哥撤回了一条消息
西瓜籽的夏天
inline行内的什么时候会用到 
张胤
inline-loader作用是干啥的 
毛子哥
我们写的只是个名字，要想先执行，还得自己写enforce参数 ？
 
徐健
inline 和normal的顺序在项目里的是什么区别 应用场景 
徐健撤回了一条消息
徐健撤回了一条消息
Hughes
没卡 

FE扫地僧
默认是那种情况呢 
岁月小小
平时用loader不写enforce的，都是Normal吗？ 
学习
为啥inline可以决定loader组合？ 
岁月小小
通过 ！！ ， -！ ， ！ 来决定 
坚持
一个loader只能设置为一种类型的loader吗 


!
!!
-!
@岁月小小  这几个符号和inline什么关系 ????
没关系
inline是配置在请求的时候 一种loader
符号决定 如何组件loaders

pitch是所有loader都要提供的方法吗？ 
不是的，一般不提供


特殊符号决定 loader的组合。使用哪些loader
毛子哥
是不是，这个特殊符号值决定引入的文件，而不是所有文件？每一个文件的loader数组是不一样的？ 
hhhhhhhh
因为有需求  是需要单独处理某个模块的  而不是全部走配置文件的loader 
Hughes
抛出的意思 

在引入index.js的时候添加了符号，是不是只针对index。js 
学习
确认一下 如果前面不加特殊符号是都引入还是只引入inline loader 
都引入
岁月

毛子哥
是不是，这个特殊符号值决定引入的文件，而不是所有文件？每一个文件的loader数组是不一样的？
说的对！！！ 

这几个符号是用来过滤loaders的，只能用在require('xxx') 路径前面。通过require('xxx') 的只有inline-loader

岁月小小说的这个最后一句话不对吧 
放在require里面的只能是inline-loader
require('loader1!loader2!./src/index.js');
说的对
Vc
pitch一般用来做什么? 
黄鹏
下面有案例讲解的。 
学习
明白了  如果loader放在require里就是inline loader 

- babel-loader
- file-loader
- url-loader
- less-loader
- style-loader
- css-loader
- sass-loader


loader 如果有异步的话，也只能用callback 吧。对 一般也会讲异步的情况 

岁月小小
老师， loader 返回值没有确定的吗？没有固定要求，要返回源代码还是语法树吗？ 
loader返回值 
最左边的loader 返回值只能是JS代码。因为它的返回值是给webpack.webpack是要用它生成JS AST
其它的loader  返回值 没有要求，可以是任意的内容，但是需要下一个 loader能处理


那我们写loader得兼容下？ 
岁月小小
因为不知道上个loader的返回值 
你得知道！！！！！不知道不行
看文档会告诉 你的

刚才只是写了include， 就可以debugger到未编译的源码里？ 

那上一个return this.callback, 我也得return this.callback？  
是的没错
岁月小小
不知道下一个loader需不需要sourcemap 
大鹏
 this.callback 第4个参数 ast 和data有关系吗
 


1.loader-running的实现
http://www.zhufengpeixun.com/grow/html/103.6.webpack-loader.html#t201.3%20loader-runner%E5%AE%9E%E7%8E%B0
2.css-loader实现
CSS抽象语法法
http://www.zhufengpeixun.com/grow/html/103.6.webpack-loader.html#t363.3.6%20css-loader.js

- pitch
- !!
都是在这个例子里用 
https://github.com/lukehaas/css-loaders
大家自己阅读 一下源码


确认一个问题：我回忆了上节课的内容 loader是按照模块来翻译的 按照这个模块需要的loader（比如4个）依次翻译完，再进入这个模块的依赖。在依赖文件里 匹配依赖文件需要的loader（可能是3个），3个 loader翻译完，再继续递归。 
学习
为什么好多人说加载文件用的jsonp 
一业
异步加载吧 
西瓜籽的夏天
记得import()是用的jsonp 
岁月小小
import()的实现是jsonp 

按照讲的顺序是先调用plugin再调用loader 


1.在编译之前先挂载所有的plugin
2.开始编译后，会依次触发plugin钩子的的执行


没执行到结尾的时候return能直接走上个normal. 后面loader不走了 
后面不走还有读文件的过程吗 
