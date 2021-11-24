(() => {
  var modules = ({
    "./src/title.js":
      ((module, exports, require) => {
        //ES 模块转换成COMM之后有哪些不一样的地方？
        //exports.__esModule=true 你可以通过它来判断转换前是不是ES 模块
        require.r(exports);
        //ES 模块默认导出export default 会挂载到exports.default上，age会挂载到exports.age上
        require.d(exports, {
          "default": () => (_DEFAULT_EXPORT__),
          "age": () => (age)
        });
        const _DEFAULT_EXPORT__ = ('title_name');
        const age = 'title_age';
      }),
    "./src/common.js":
      ((module, exports, require) => {
        exports.name = 'title_name';
        exports.age = 'title_age';
      })
  });
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
      if (require.o(definition, key) && !require.o(exports, key)) {
        Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
      }
    }
  };
  require.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
  require.r = (exports) => {
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
    }
    Object.defineProperty(exports, '__esModule', { value: true });
  };
  let title = require("./src/common.js");
  //console.log(title);
  console.log(title.age);
})()
  ;