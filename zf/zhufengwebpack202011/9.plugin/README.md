webpack会自动写文件吗，没看到有调用方法啊 
岁月小小
挂在assets上了，webapck会根据assets写文件 
Stephen&Joe
不写文件最后哪有输出呢 
Stephen&Joe
最后动作应该就是根据对象写文件 
华仔
想知道最后写文件的机制是啥 
Stephen&Joe
是不是node的fs模块那一套 
岁月小小
assets上有文件名，文件内容信息，根据这个写文件 
Stephen&Joe
file name和 source反正是都有了 
毛子哥
compilation和compiler什么区别，他们的监听的事件不是一个吧 
坚持
new JSZIP是不是也是node的方法 
毛子哥
rawsource是干什的 
Stephen&Joe
一个是单次编译对象，一个是整个任务的 
坚持
应该是他们身上有不同作用的钩子 
徐健
RAWSOURCE哪里来的 
张宝丰
能和dist一层嘛 


Compilation源码在eebpack哪里？
https://github.com/webpack/webpack/blob/master/lib/Compiler.js#L105
https://github.com/webpack/webpack/blob/v4.39.3/lib/Compilation.js 
学习
Launch.json.看下 
  {
            "name": "Launch via NPM",
            "request": "launch",
            "runtimeArgs": [
                "run-script",
                "debug"
            ],
            "runtimeExecutable": "npm",
            "skipFiles": [
                "<node_internals>/**"
            ],
            "type": "pwa-node"
        }

岁月小小
Compilation 是编译一个文件生成一个Compilation 吗？ 
每次编译生在一个Compilation

毛子哥
为什么要经过这一层包装呢？ 
Stephen&Joe
一言不合就开写，就实现。。。。 

