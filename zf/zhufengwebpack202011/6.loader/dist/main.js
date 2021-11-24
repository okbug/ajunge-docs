(() => {
  var __webpack_modules__ = {
    "./src/index.less": () => {
      let style = document.createElement("style");
      style.innerHTML = "body {\n  background-color: green;\n}\n";
      document.head.appendChild(style);
    },
  };
  var __webpack_module_cache__ = {};
  function __webpack_require__(moduleId) {
    if (__webpack_module_cache__[moduleId]) {
      return __webpack_module_cache__[moduleId].exports;
    }
    var module = (__webpack_module_cache__[moduleId] = {
      exports: {},
    });
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
    return module.exports;
  }
  (() => {
    __webpack_require__("./src/index.less");
  })();
})();
