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
    // 感叹号分隔符，它是什么意思？它的意思是此./src/index.css经过css-loader.js处理后的结果
    "css-loader.js!./src/index.css":(module,exports,require)=>{
      var api = require("api.js");
      let cssWithMappingToString = item=>item[1];
      let EXPORT = api(cssWithMappingToString);
      let GLOBAL = require("css-loader.js!./src/global.css");
      EXPORT.i(GLOBAL);
      EXPORT.push([
         module.id,"body{\r\ncolor: red;\r\n}"
      ]);
      module.exports = EXPORT;
    },
    "api.js":(module,exports,require)=>{
      module.exports = function(cssWithMappingToString){
        var list = [];//为什么搞了个数组，是为了方便后面处理@import
        list.toString = function(){
          return this.map(cssWithMappingToString).join("");
        }
        list.i = function(otherList){
          list.unshift(...otherList);
        }
        return list;
      }
    },
    "./src/index.css":(module,exports,require)=>{
      var result = require("css-loader.js!./src/index.css");
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
  const css = require("./src/index.css");
  console.log(css);
})()

// module.exports = "body{\r\n background-color: green;\r\n}";