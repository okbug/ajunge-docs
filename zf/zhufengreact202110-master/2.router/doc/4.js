let pathToRegExp = require('path-to-regexp');
let keys = [];//先声明一个空数组
//pathToRegExp方法会给在转换正则的过程中把路径参数名提取出来添加到params里
let regexp = pathToRegExp("/user/:id/:name", keys, { end: false });
let values = regexp.exec('/user/1/zhangsan/other');//[url，'1','zhangsan']
console.log(keys);
//路径参数

let paramNames = keys.map(item => item.name);                      //[id,name]

let memo = paramNames.reduce((memo, paramName, index) => {
    memo[paramName] = values[index + 1];
    return memo;
}, {});;
console.log(memo);

