const {resolve,join} = require('path');
//会把相对路径转成绝对路径 
//c:\aproject\zhufengwebpack202011\1.basic\a\b
console.log(resolve('./a','b'));
//非常死板或者说机械的连接
//a\b
console.log(join('a','b'));
//__dirname是指的当前的文件所在的目录