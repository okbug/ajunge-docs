let pathToRegExp = require('path-to-regexp');
let keys = [];
let regxp = pathToRegExp('/user/:id/:name',keys,{end:true,sensitive:true,strict:false});
console.log(regxp);
let result = '/user/100/zhufeng'.match(regxp);

console.log(result);
let paramNames = keys.map(key=>key.name);
console.log(paramNames);
let values = result.slice(1);
let params = paramNames.reduce((memo,key,index)=>{
    memo[key]=values[index];
    return memo;
},{});
console.log(params);
//match.params = {id:100,name:'zhufeng'};
//啥时候用exec 啥时候用test 
