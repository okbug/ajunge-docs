let pathToRegExp = require('path-to-regexp');
//可以把一个字符串转成正则表达式
let keys = [];
/**
 * strict 是否允许 结尾有一个可选的/
 * sensitive 是否大小写敏感
 * end 是否匹配整个字符串，true,整个，如果false 匹配前缀
 */
let regexp = pathToRegExp('/user/:id',keys,{end:true,sensitive:true,strict:true});
console.log(regexp);
let result = '/user/1'.match(regexp);
keys = keys.map(item=>item.name);
let [,...values]= result;
let parmas = keys.reduce((memo,key,index)=>{
    memo[key]=values[index]
    return memo;
},{});
console.log(parmas);



