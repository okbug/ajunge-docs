// node中常用的模块 分为三种 1.内置模块、核心模块 （不需要安装直接能用 node自带的）
// 2.文件模块 （require('./Promise')） 自己写的文件自己使用  引用的时候有相对路径或者绝对路径
// 3.第三方模块 别人写好的用的时候先下载在使用，使用方式和内置模块一样


// fs path vm

let fs = require('fs'); // 内部一般有两种api 同步、异步

// require 就是一个读取文件的操作 

// 在读取文件之前 目录可能不存在
let exists = fs.existsSync('./note.md'); // 判断文件是否存在
if(exists){
    let data = fs.readFileSync('./note.md','utf8'); // 同步会阻塞，但是当代码执行前我都可以采用同步的方式
}

let path = require('path'); // 路径处理模块

console.log(path.join(__dirname,'a','//b','c','..'))
console.log(path.resolve('a','b','c','..')); // 他也具备拼接的功能，但是最终出来的结果是一个绝对路径,path.resolve 遇到/ 表示的是根路径， 默认以当前路径（process.cwd()）解析成绝对路径

// 主要看有没有 / 其他情况下用谁都写
console.log(path.basename('a.js','.js')); // 用路径做减法
console.log(path.extname('a.js')); //.js 取最后一个后缀名作为结果
console.log(path.relative('a/b/c','c')); // 获取当前的相对路径
console.log(path.dirname(__filename)); // === __dirname 内部__dirname就是这样产生的



const vm = require('vm'); // 开发时基本用不到, 可以让一个字符串执行


// eval('console.log(fs)')
// eval 执行的时候会采用上级的变量 new Function  这两个方法可能会受到外界因素影响,不安全
// const sum = new Function('a', 'b', 'return a + b + c');
global.a = 100;

vm.runInNewContext('console.log(a)'); // 沙箱执行，实现一个全新的上下文 


// js中如何实现沙箱机制呢？  尝试实现一下  快照 、 proxy来实现