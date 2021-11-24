//模块定义空的

var modules = ({});
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
//chunkId title ,promises=[]
//已经安装好的或者说加载好的代码块
//key代码块的名字，入口默认就是main
//值0表示已经就绪 加载完成
var installedChunks = {
  main: 0,
  //title: [resolve, reject,promise]
  //title: 0
}
require.l = (url) => {
  var script = document.createElement('script');
  script.src = url;
  document.head.appendChild(script);
}
require.e = (chunkId) => {
  let installedChunkData;
  let promise = new Promise((resolve, reject) => {
    installedChunkData = installedChunks[chunkId] = [resolve, reject]
  });
  installedChunkData[2] = promise
  var url = chunkId + '.main.js'
  require.l(url);
  return promise;
}
var webpackJsonpCallback = (data) => {
  let [chunkIds, moreModules] = data;
  //把返回的模块定义合并到当前的模块定义对象modules里
  for (let moduleId in moreModules) {
    modules[moduleId] = moreModules[moduleId];
  }
  for (let i = 0; i < chunkIds.length; i++) {
    let chunkId = chunkIds[i];
    let resolve = installedChunks[chunkId][0];
    installedChunks[chunkId] = 0;
    resolve();//调用promise的resolve方法让promise成功
  }
}
var chunkLoadingGlobal = window["webpackChunk_2_bundle"] = [];
chunkLoadingGlobal.push = webpackJsonpCallback;

const load = document.getElementById('load');
load.addEventListener('click', () => {
  //懒加载或者说动态加载title这个代码块，返回一个promise,然后再加载此模块，得到模块exports,然后打印就可以了
  //代码的主是一块代码，每个代码块里面会有若干个模块
  //通过 require.e("title")动态加载title代码块，通过 jsonp加载title.main.js文件，取得对应的代码块，
  //然后把代码块里的模块定义合并到当前文件的modules里
  //然后通过require加载"./src/title.js"模块，得到返回值，不管原来是comonjs还是es,都会转成es
  require.e("title").then(() => require("./src/title.js")).then(result => {
    console.log(result);
  });
});