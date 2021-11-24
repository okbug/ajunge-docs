(() => {
  var modules = ({
    "./src/title.js":
      ((module, exports) => {
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
  var exports = {};
  (() => {
    let title = require("./src/title.js");
    console.log(title.name);
    console.log(title.age);
  })();
})()
  ;