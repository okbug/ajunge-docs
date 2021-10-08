const express = require('./express');

const app = express();

// path-to-regexp  把路径转化成正则， 和请求来的路径做匹配 获得对象

// 我的路径必须是 /user/随意的id/随意的名字/xxx
app.get('/user/:id/:name/xxx',function(req,res){  // => {id:随意的id,name:随意的名字}
    res.end(JSON.stringify(req.params))
})

// // let reg = /\/user\/([^\/]+)\/([^\/]+)\/xxx/
// function pathToRegExp(str,keys){
//     str = str.replace(/:([^\/]+)/g,function(){
//         keys.push(arguments[1])
//         return '([^\/]+)'
//     });
//     return new RegExp(str);
// }
// let p = '/user/:id/:name/xxx/:xxx';
// let keys = []
// let reg = pathToRegExp(p,keys);
// let url = '/user/1/zf/xxx/abc';
// console.log(url.match(reg).slice(1),keys); 

app.listen(3000,function(){
    console.log(`server start 3000`)
})
