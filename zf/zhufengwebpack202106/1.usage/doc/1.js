const path = require('path');
console.log(path.join('a','b'));//不一定是绝对
console.log(path.resolve('a','b'));//一定是绝对路径