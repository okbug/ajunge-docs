// (() => {
//     var __webpack_modules__ = {
//       "./src/title.js": (module) => {
//         module.exports = "title";
//       },
//     };
//     var __webpack_module_cache__ = {};

//     function __webpack_require__(moduleId) {
//       var cachedModule = __webpack_module_cache__[moduleId];
//       if (cachedModule !== undefined) {
//       }
//       var module = (__webpack_module_cache__[moduleId] = {
//         exports: {},
//       });
//       __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
//       return module.exports;
//     }
//     var __webpack_exports__ = {};
//     (() => {
//       const title = __webpack_require__("./src/title.js");
//       console.log(title);
//     })();
//   })();

var modules = {
  // 每一个moduleId都是一个函数，里面是原模块中的源代码
  title: (module) => {
    module.exports = "title";
  },
};
var cache = {};
function require(moduleId /* title */) {
  // 核心模块加载器
  if (cache[moduleId]) {
    // 如果前面已经加载过了，就直接返回
    return cache[moduleId].exports;
  }

  // 没有缓存就开始创建一个新的
  var module = (cache[moduleId] = {
    exports: {},
  });

  // 执行modules中的那个函数
  modules[moduleId](module, module.exports, require);
  return module.exports;
}
(() => {
  // 这里是入口文件
  let title = require("title" /* moduleId */);

  console.log(title); // title
})();
