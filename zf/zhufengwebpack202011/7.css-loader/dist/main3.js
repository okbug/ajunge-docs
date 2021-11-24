(function(){
  var modules = {
    "css-loader.js!./src/global.css":(module,exports,require)=>{
      var api = require("api.js");
      let cssWithMappingToString = item=>item[1];
      let EXPORT = api(cssWithMappingToString);
      EXPORT.push([
         module.id,"body{\r\n background-color: green;\r\n}"
      ]);
      module.exports = EXPORT;
      
    },
    "api.js":(module,exports,require)=>{
      module.exports = function(cssWithMappingToString){
        var list = [];//为什么搞了个数组，是为了方便后面处理@import
        list.toString = function(){
          return this.map(cssWithMappingToString).join("");
        }
        return list;
      }
    },
    "./src/global.css":(module,exports,require)=>{
      var result = require("css-loader.js!./src/global.css");
      module.exports = result.toString();
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