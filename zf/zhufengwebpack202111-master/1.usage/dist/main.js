(function () {
  var modules = ({
    "lodash":
      (function (module) {
        module.exports = window._;
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
  var exports = {};
  !function () {
    let lodash = require("lodash");
    console.log(lodash);
  }();
})()
  ;