(function(){
  var modules = {
    "./src/global.css":(module,exports,require)=>{
       var list = [];//为什么搞了个数组，是为了方便后面处理@import
       list.push([
         module.id,"body{\r\n background-color: green;\r\n}"
       ]);
       //这是一个映射函数，把每一个CSS描述对象转成CSS代码
       let cssWithMappingToString = item=>item[1];
       let css = list.map(cssWithMappingToString).join("");
       module.exports = css;
       //module.exports = "body{\r\n background-color: green;\r\n}";
    }
  }  
  var cache = {};
  function require(moduleId) {
    if (cache[moduleId]) {
      return cache[moduleId].exports;
    }
    var module = (cache[moduleId] = {
      id: moduleId,
      exports: {},
    });
    modules[moduleId](module, module.exports, require);
    return module.exports;
  }
  const css = require("./src/global.css");
  console.log(css);
})()

// module.exports = "body{\r\n background-color: green;\r\n}";