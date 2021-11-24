var modules = ({
  "./src/index.js":
    ((module) => {
      module.exports = {
        add(a, b) {
          return a + b;
        }
      };
    })
});
var cache = {};
function require2(moduleId) {
  var cachedModule = cache[moduleId];
  if (cachedModule !== undefined) {
    return cachedModule.exports;
  }
  var module = cache[moduleId] = {
    exports: {}
  };
  modules[moduleId](module, module.exports, require2);
  return module.exports;
}
exports.calculator = require2("./src/index.js");