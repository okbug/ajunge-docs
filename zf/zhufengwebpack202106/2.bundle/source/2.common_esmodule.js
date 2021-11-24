var modules = ({
    "./src/title.js":
      ((__unused_webpack_module, exports, require) => {
        require.r(exports);//exports.__esModule=true 只有esModule才有此属性
        require.d(exports, {//exports.default = 'title_name'  exports.age=title_age
          "default": () => __WEBPACK_DEFAULT_EXPORT__,//值不是属性描述器
          "age": () => age
        });
        const __WEBPACK_DEFAULT_EXPORT__ = ('title_name');
        const age = 'title_age';
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
//用访问器(getter)给对象定义属性 
/**
 * Object.defineProperties= (obj,{key1:descriptor1,key2:descriptor2})=>{}
 * require.defineProperties=(obj,{key1:getter1,key2:getter2})
 */
require.d=require.defineProperties = (exports,definition)=>{
    for(let key in definition){
        Object.defineProperty(exports,key,{
            enumerable:true,
            get:definition[key]
        });
    }
}
//判断一个对象上有没有某个属性
require.ownProperty=require.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);

require.renderESModule = require.r = (exports) => {
    Object.defineProperty(exports,Symbol.toStringTag,{value:'Module'});
    //模块里出现了export或者import的话,我们在运行的时候可以通过__esModule来反推这是不是一个es module
    Object.defineProperty(exports,'__esModule',{value:true});
}

let title = require("./src/title.js");
console.log(title.default);
console.log(title.age);