function require() {}
// 上面代码和 1.sync/main.js 中一样

// commonjs要加载esmodule需要添加下面这几个方法

require.r = function (exports) {
  // 如果有Symbol就用
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  Object.defineProperty(exports, "__esModule", { value: true });
};

require.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);

require.d = (exports, definition) => {
    for (var key in definition) {
        if (require.o(definition, key) && !require.o(exports, key)) {
            Object.defineProperty(exports, key, {enumerable: true, get: definition[key]})
        }
    }
}