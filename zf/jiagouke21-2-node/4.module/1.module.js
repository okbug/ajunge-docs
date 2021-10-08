// node中的模块 1.内置模块 、核心模块  2.第三方模块 commander/co   3.文件模块(有相对路径 、 绝对路径)
// 模块是有规范 commonjs 规范  es6Module
// es6Module “静态”导入, 在编译的时候就可以知道使用了哪些变量, 可以实现tree-shaking  (都是发送http请求)
// commonjs 模块 “动态导入”, commonjs 模块是不支持tree-shaking  (读文件 同步操作)


// commonjs 模块定义了自己的规范，按照规范来使用就可以
// 1.如果想使用哪个模块 就require谁 (后缀可以省略 默认会查找.js 文件， 没有js找.json)
// 2.如果这个模块需要被别人使用，需要导出具体的内容  module.exports 更改这个变量导出的结果
// 3.在node中每个文件js，json文件都是一个模块
// 4.一个包中含有多个模块 （每个包都必须配置一个package.json 文件）
const path = require('path');
const fs = require('fs');
const vm = require('vm');
function Module(id){
    this.id = id; // 绝对路径
    this.exports = {}; // 模块对应的导出结果
}
Module._extensions = {
    '.js'(module){
        let script = fs.readFileSync(module.id,'utf8');
        let template = `(function(exports,module,require,__filename,__dirname){${script}})`;
        let compileFunction = vm.runInThisContext(template);
        let exports = module.exports; // 为了实现一个简写 
        let thisValue = exports; //  this = exports = module.exports = {}  
        let filename = module.id;
        let dirname = path.dirname(filename)
        compileFunction.call(thisValue,exports,module,myRequire,filename,dirname)
    },
    '.json'(module){
        let script = fs.readFileSync(module.id,'utf8');
       module.exports = JSON.parse(script); // 直接将json挂载到exports 对象上，这样用户可以直接require一个json文件，拿到的就是json的内容
    }
}
Module._resolveFilename = function (filename) {
   const filePath =  path.resolve(__dirname,filename);
   let exists = fs.existsSync(filePath);
   if(exists) return filePath;
   // 尝试添加 .js 和 json后缀
   let keys = Reflect.ownKeys(Module._extensions);
   for(let i = 0 ; i< keys.length;i++){
       let newPath = filePath +keys[i];
       if(fs.existsSync(newPath)) return newPath
   }
   throw new Error('module not found')
}
Module._cache = {}; // 用来做缓存的
Module.prototype.load = function () {
    let extension = path.extname(this.id); //  要加载的文件名
    Module._extensions[extension] && Module._extensions[extension](this)
}
function myRequire(filename){ // 可能不具备后缀
    let filePath = Module._resolveFilename(filename);
    let exists = Module._cache[filePath];
    if(exists){
        return exists.exports;
    }
    // 2.创造一个模块
    let module = new Module(filePath)

    Module._cache[filePath] = module;
    // 获取模块中的内容，包装函数，让函数执行，用户的逻辑会给module.exports 赋值
    module.load();
    return module.exports; // 最后的结果
}
let r = require('./a');
r = require('./a');
console.log(r);

// function(module,exports,require,__dirname,__filename){
//     module.exports = 'hello'                 
//     return module.exports                           
// }()
// console.log(r)

// 原理就是 1.读取文件 2. 包装函数 ，设置参数 3，默认返回module.exports 对象


// node  --inspect-brk 1.module.js 


// 模块的实现原理 （看源码 先横向扩展，在纵向深入。 避免一个函数看到底）   一直调试代码

// 学习源码 思想 （变成自己的理解 -》 能自己写出一个demo 借助思想）

// 1.实现一个require方法
// 2.Module._load 实现模块的加载 
// 3.Module._resolveFilename  把文件名解析成一个绝对路径出来 
// 4.实现模块的缓存  (根据绝对路径进行模块的缓存)
    // module.exports会在第一次缓存起来 (导出的结果，如果是对象，内部属性变了会有影响)，后续在去使用的话 ，会取上次的返回值
    // es6模块 使用export {a} 导出的是一个变量 （接口），如果内部对应的值发生变化是有影响的

// 5.会尝试加载是不是一个原生模块，如果带相对路径、绝对路径 就不是核心模块
// 6.创建一个模块 根据文件路径来创建 （一个模块必须要要有是三个属性 id,path,exports(后续文件导出的结果需要保存到这个变量上 {})）
// 7.模块的加载，根据创建的模块进行模块的加载
// 8. 记载模块时会构建一个paths 属性，这个属性就是第三方模块的查找路径
// 9.取出文件的后缀  Module._extensions 调用对应的加载模块的策略
// 10.读取文件内容
// 11.js情况在文件内容外面包裹一个函数
//    exports = module.exports = 'hello'
// 12. 最终require方法会拿到 module.exports 返回结果
// console.log(this)




// 总结：最终用户使用的结果都来自于module.exports 如果只是改变exports引用，不会影响module.exports 的值，但是给exports 增添属性 ，是可以修改module.exports的。 注意不要同时使用exports，和module.exports。否则会以module.exports 结果为基准

// 直接操作global属性，就可以不用导出了. 但是会污染全局变量 不建议使用