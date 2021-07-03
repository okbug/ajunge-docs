(() => { // webpackBootstrap
  "use strict";
  var __webpack_modules__ = {


    // {
    //   // no module.id needed
    //   // no module.loaded needed
    //   exports: {}
    // }
/***/ "./src/main.js": (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

      __webpack_require__.r(__webpack_exports__);
      /* harmony import */
      var _util_b__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/b */ "./src/util/b.js");
      console.log('main', _util_b__WEBPACK_IMPORTED_MODULE_0__.default)
      //# sourceURL=webpack://day1/./src/main.js?;

      /***/
    },

/***/ "./src/util/a.js": ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

      __webpack_require__.r(__webpack_exports__)
      /* harmony export */
      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__,
        /* harmony export */   "a": () => /* binding */ a,
        /* harmony export */  "b": () => /* binding */ b,
        /* harmony export */   "c": () => /* binding */ c,
        /* harmony export */   "fnb": () => /* binding */ fnb,
        /* harmony export */   "A": () => /* binding */ A
        /* harmony export */
      });
      console.log(888)
      /* harmony default export */
      const __WEBPACK_DEFAULT_EXPORT__ = ({
        a: 123
      });
      // export default {\r\n//   b: 123\r\n// }\r\n\r\nvar a = 123;\r\nlet b = 234;\r\nconst c = 666;\r\nfunction fnb() { }\r\nclass A { }\n\n//# sourceURL=webpack://day1/./src/util/a.js?;

      /***/
    }),

/***/ "./src/util/b.js": ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

      eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./a */ \"./src/util/a.js\");\n\r\n\r\n\r\nconsole.log(_a__WEBPACK_IMPORTED_MODULE_0__.default, 'bbbb')\r\n\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\r\n  bb: 123\r\n});\n\n//# sourceURL=webpack://day1/./src/util/b.js?");

      /***/
    })

  };
  /************************************************************************/
  // The module cache
  var __webpack_module_cache__ = {};

  // The require function
  function __webpack_require__(moduleId) { //"./src/main.js"
    // Check if module is in cache
    if (__webpack_module_cache__[moduleId]) {
      return __webpack_module_cache__[moduleId].exports;
    }
    // Create a new module (and put it into the cache)
    var module = __webpack_module_cache__[moduleId] = {
      // no module.id needed
      // no module.loaded needed
      exports: {}
    };

    // Execute the module function
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);

    // Return the exports of the module
    return module.exports;
  }

  /************************************************************************/
  /* webpack/runtime/define property getters */
  (() => {
    // define getter functions for harmony exports
    __webpack_require__.d = (exports, definition) => {
      for (var key in definition) {
        if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
          Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
        }
      }
    };
  })();

  /* webpack/runtime/hasOwnProperty shorthand */
  (() => {
    __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
  })();

  /* webpack/runtime/make namespace object */
  (() => {
    // define __esModule on exports
    //  吧exports 做成一个 esModule的模块
    __webpack_require__.r = (exports) => {
      if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      }
      Object.defineProperty(exports, '__esModule', { value: true });
    };
  })();

  /************************************************************************/
  // startup
  // Load entry module
  __webpack_require__("./src/main.js");
  // This entry module used 'exports' so it can't be inlined
  /******/
})()
  ;