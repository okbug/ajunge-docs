// 1.模块查找机制


// 源码里会先检测是不是一个 内置模块， 文件模块

// 每个npm的版本不太一致，在有些版本中如果文件夹里面有package.json 就会先找文件夹. 老的版本可能会查找文件夹下的index.js
// 先添加后缀查找有没有此文件，如果没有文件找同名的目录。默认会去找package.json对应的字段，如果没有查找index.js 文件

// 第三方模块查找 会现在自己的目录下node_modules 下查找同名的文件夹，找不到向上层查找，到根目录位置，如果都找不到则出错  module.paths
const a = require('a'); // 这个可不会查找全局模块
console.log(a,module.paths);

