



var modules = {};
var cache = {};
function require(moduleId) {
    var cachedModule = cache[moduleId];
    if (cachedModule !== undefined) {
        return cachedModule.exports;
    }
    var module = cache[moduleId] = {
        exports: {}
    };
    modules[moduleId](module, module.exports, require);
    return module.exports;
}
//定义查找代码块的方法
require.find = {};
//通过JSONP异步加载指定的代码块
require.ensure = (chunkId) => {
    let promises = [];
    require.find.jsonp(chunkId, promises);//在jsonp里会创建promise,并且添加到promises数组里
    return Promise.all(promises);
}
require.publicPath = '';//资源文件的访问路径,默认是空串

require.unionFileName = (chunkId) => {
    return "" + chunkId + ".js";//title.js
};
require.load = (url) => {
    let script = document.createElement('script');
    script.src = url;
    document.head.appendChild(script);//一旦append之后,浏览器会立刻请求对应脚本
}
//已经安装或者说加载好的chunk,也可能是加载中的
//0表示已经加载就绪
var installedChunks = {
    "main": 0,
    //"title":[resolve, reject,promise]
};
require.find.jsonp = (chunkId, promises) => {
    var installedChunkData;
    let promise = new Promise((resolve, reject) => {
        installedChunkData = installedChunks[chunkId] = [resolve, reject]
    });
    installedChunkData[2] = promise;
    promises.push(promise);
    var url = require.publicPath + require.unionFileName(chunkId);// title.js
    require.load(url);
}
var webpackJsonpCallback = ([chunkIds, moreModules]) => {
    debugger
    var resolves = [];
    for (let i = 0; i < chunkIds.length; i++) {
        let chunkId = chunkIds[i];//title
        resolves.push(installedChunks[chunkId][0]);//把chunk对应的promise的resolve方法添加到resolves数组里
        installedChunks[chunkId] = 0;//已经 加载完成了
    }
    for (let moduleId in moreModules) {
        modules[moduleId] = moreModules[moduleId];
    }
    while (resolves.length) {
        resolves.shift()();//让promise的resolve执行,让promise成功
    }
}
var chunkLoadingGlobal = self["webpackChunk_2_bundle"] = self["webpackChunk_2_bundle"] || [];
chunkLoadingGlobal.push = webpackJsonpCallback;
debugger
require.ensure("title")//先加载代码块 
    .then(require.bind(require, "./src/title.js"))//require模块
    .then(result => {//获取结果 
        console.log(result);
    });