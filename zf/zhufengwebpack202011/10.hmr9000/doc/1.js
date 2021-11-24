
let path = require('path');
//从当前路径出发，得到一个绝对路径
//C:\aproject\zhufengwebpack202011\10.hmr9000\doc\b
console.log(path.resolve('./webpack'));
//解析模块路径
//c:\aproject\zhufengwebpack202011\10.hmr9000\node_modules\webpack\lib\index.js
console.log(require.resolve('./webpack'));