(()=>{
  var modules = {
    './src/title.js':(module,exports,require)=>{
      module.exports = 'title';
    }
  }
  var cache = {};
  function require(moduleId){
    if(cache[moduleId]){//先看缓存里有没有已经缓存的模块对象
      return cache[moduleId].exports;//如果有就直接返回
    }
    //module.exports默认值 就是一个空对象
    var module = {exports:{}};
    cache[moduleId]= module;
    //会在模块的代码执行时候给module.exports赋值
    modules[moduleId].call(module.exports,module,module.exports,require);
    return module.exports;
  }
  //./src/index.js 的代码
  (()=>{
    let title = require('./src/title.js');
    console.log(title);
  })();
})();