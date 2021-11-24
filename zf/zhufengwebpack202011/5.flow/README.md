## 1.不是说命令行中mode决定模块内的吗 怎么又有优先级 
- 配置项 一个来自于webpack.config.js mode, 一个来自于命令行 mode
- 因为命令行传参优先级更高，所以mode最终的值就是命令行的mode,然后此mode会传递给模块内

我们现在在讲大体和工作流
webpack是如何工作的
loader
plugin 
ast
依赖分析
assets
chunks 
modules
files

讲完后我们再各个突破

不同的hook,触发的顺序就是hooks 触发的顺序
同一个hook,就是注册的顺序

## 问题
现在怎么连声音也没有了？

1. entry可能是对象?是的，没错！

处理loader顺序应该是倒序吧。 是的
毛子哥
test.test 
Y
倒着执行这么设计有什么意义吗？ 是因为其实并不是倒着执行中因为正着执行执行已经有人用了

Encore
现在两者是没区别的把，直接return了 

webpack 内部也是用的babel么？ 还是其他的ast库呀。
webpack内部用的是 acorn？
表示源代码是一个模块
script
parse第二个参数 sourceType：'module'是啥意思 
2014
应该是使用 ES6 Module 吧 
张胤
Value外面不是还有一层吗 
毛子哥
都添加个posix干啥 
为了全部统一为unix格式的分隔符
不加posix  \ /
加posix  全都是/

毛子哥
如果引入都是绝对路径呢 
```js
let moduleName = node.arguments[0].value;
//要判断一个moduleName绝对还是相对，相对路径才需要下面的处理
let depModulePath;
if(path.isAbsolute(moduleName)){
    depModulePath=moduleName;
}else{
      //获取路径所有的目录
  //C:\aproject\zhufengwebpack202011\5.flow\src
  let dirname = path.posix.dirname(modulePath);
  //C:\aproject\zhufengwebpack202011\5.flow\src\title.js
  depModulePath = path.posix.join(dirname,moduleName);
}
```
Encore
转为绝对路径的时候，不需要在最后面加.js吗？

路径 
Hughes
入口名称 
毛子哥
hash 
学习
路径.变成_ 

模块ID moduleId
相对于根目录的相对路径
title.js
绝对路径  C:\aproject\zhufengwebpack202011\5.flow\src\title.js
根目录 C:\aproject\zhufengwebpack202011\5.flow\
此模块的绝对路径相对于根目录的相对路径 ./src/title.js 就是模块ID
代码块ID chunkId
import('./title.js');
分割出去一个代码块，代码块的名字
./src/title.js
src_title_js


小叶子
sourceCode -> ast语法树 -> 生成新代码  在ast语法树阶段，只是寻找require语句吗？没有做其他的吧？ 
hhhhhhhh
感觉没有递归啊 
徐健
buildModule里面看下 

这个run 钩子会执行很多次吗？在哪些时候触发啊 
