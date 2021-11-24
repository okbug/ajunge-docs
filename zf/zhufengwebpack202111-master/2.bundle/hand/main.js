var modules = {
  './src/title.js': (module, exports, require) => {
    //一旦webpack检测到你的代码里有export 和import关键字，它就认为这是一个ES Module
    require.r(exports);
    require.d(exports, {
      default: () => DEFAULT_EXPORT,
      age: () => age
    });
    var DEFAULT_EXPORT = 'title_name';
    var age = 'title_age';
    setTimeout(() => {
      age = 'new'
    }, 1000);
  },
  "./src/common.js":
    ((module, exports, require) => {
      var age = { x: 1 }
      exports.age = age;
      setTimeout(() => {
        //age = { x: 2 }
        age.x = 10;
      }, 1000);
    })
}
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
require.d = (exports, definition) => {
  for (var key in definition) {
    Object.defineProperty(exports, key, { get: definition[key] });
  }
}
require.r = (exports) => {
  //表示这个exports是一个ES模块的导出对象 [object Module]
  Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
  //exports.__esModule=true;
  Object.defineProperty(exports, '__esModule', { value: true });
}
debugger
let title = require("./src/common.js");
//console.log(title.default);
setTimeout(() => {
  console.log(title.age);
}, 3000);