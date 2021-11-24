let {SyncHook} = require('tapable');
const path = require('path');
const fs = require('fs');
const types = require('babel-types');
const parser = require('@babel/parser');//源代码转成AST抽象语法树
const traverse = require('@babel/traverse').default;//遍历语法树
const generator = require('@babel/generator').default;//把语法树重新生成代码
const Complication = require('./Complication');
//path.posix.sep / path.sep不同操作系统的路径分隔符 \/
function toUnixPath(filePath){
  return filePath.replace(/\\/g,'/');
}
//根目录，当前工作目录
let baseDir  = toUnixPath(process.cwd());
class Compiler{
    constructor(options){
        this.options = options;
        this.hooks = {
            run:new SyncHook(),//会在开始编译的时候触发
            emit:new SyncHook(),//会在将要写入文件的时候触发
            done:new SyncHook()//会在完成编译的时候触发
        }
    }
    compile(callback){
      let complication = new Complication(this.options);
      complication.build(callback);
    }
    //4.执行对象的run方法开始执行编译
    run(callback){
       //当调用run方法的时候会触发run这个钩子, 进而执行它的回调函调 
       this.hooks.run.call(); 
       this.compile(callback);
      fs.watchFile(this.options.entry.page1,()=>{
         this.compile(callback);
       });
       this.hooks.done.call();    
    }
    /**
     * 编译模块 1.读取模块文件
     * @param {*} modulePath 
     */
    buildModule=(name,modulePath)=>{
        //读取原始源代码
        let sourceCode = fs.readFileSync(modulePath,'utf8');
        //查找此模块对应的loader对代码进行转换
        let rules = this.options.module.rules;
        let loaders = [];
        for(let i=0;i<rules.length;i++){
            //正则匹配上了模块的路径
            if(rules[i].test.test(modulePath)){
                loaders=[...loaders,...rules[i].use];
            }
        }
        //loaders=['logger1-loader.js','logger2-loader.js','logger3-loader.js','logger4-loader.js']
        for(let i=loaders.length-1;i>=0;i--){
            let loader = loaders[i];
            sourceCode=require(loader)(sourceCode);
        }
        let moduleId = './'+path.posix.relative(baseDir,modulePath);
        //webpack最核心 的几个概念要出场了 module 模块ID ，依赖的数组
        let module = {id:moduleId,dependencies:[],name};
        //现在我们已经得到转换后的代码 babel-loader es6=>es5
        //再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理
        let astTree = parser.parse(sourceCode,{sourceType:'module'});
        //遍历语法树，并找出require节点
        traverse(astTree,{
            CallExpression:({node})=>{
                if(node.callee.name === 'require'){
                    //1.相对路径 2.相对当前模块  
                    //2.绝对路径
                    let moduleName = node.arguments[0].value;
                    //要判断一个moduleName绝对还是相对，相对路径才需要下面的处理
                    //获取路径所有的目录
                    //C:\aproject\zhufengwebpack202011\5.flow\src
                    let dirname = path.posix.dirname(modulePath);
                    //C:\aproject\zhufengwebpack202011\5.flow\src\title
                    let depModulePath = path.posix.join(dirname,moduleName);
                    let extensions = this.options.resolve.extensions;
                    //C:\aproject\zhufengwebpack202011\5.flow\src\title.js
                    depModulePath = tryExtensions(depModulePath,extensions,moduleName,dirname);
                    //模块ID的问题 每个打包后的模块都会有一个moduleId
                    //"./src/title.js"  depModulePath=/a/b/c  baseDir=/a/b relative=>c ./c
                    let depModuleId = './'+path.posix.relative(baseDir,depModulePath);//./src/title.js
                    //修改抽象语法树
                    node.arguments = [types.stringLiteral(depModuleId)];
                    //判断现有的已经编译过的modules里有没有这个模块，如果有不用添加依赖了，没有则需要添加
                    let alreadyModuleIds = Array.from(this.modules).map(module=>module.id);
                    //如果已经编译过的模块的里不包含这个依赖模块的话才添加，如果已经包含了，就不要添加了
                    if(!alreadyModuleIds.includes(depModuleId)){
                        module.dependencies.push(depModulePath);
                    }
                }
            }
        });
        //根据新的语法树生成新代码
        let {code}=generator(astTree);
        module._source = code;//转换后的代码 module moduleId dependencies _source
        //再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理
        module.dependencies.forEach(dependency=>{
            let dependencyModule = this.buildModule(name,dependency);
            this.modules.add(dependencyModule);
        });
        return module;
    }
}
//let chunk = {name:'main',entryModule,modules:this.modules}; 
function getSource(chunk){
   return `
   (() => {
    var modules = {
      ${
          chunk.modules.map(module=>`
          "${module.id}": (module,exports,require) => {
            ${module._source}
          }`).join(',')
      }
    };
    var cache = {};
    function require(moduleId) {
      if (cache[moduleId]) {
        return cache[moduleId].exports;
      }
      var module = (cache[moduleId] = {
        exports: {},
      });
      modules[moduleId](module, module.exports, require);
      return module.exports;
    }
    (() => {
     ${chunk.entryModule._source}
    })();
  })();
   `;
}
function tryExtensions(modulePath,extensions,originalModulePath,moduleContext){
    extensions.unshift('');
    for(let i=0;i<extensions.length;i++){
       if(fs.existsSync(modulePath+extensions[i])){
        return modulePath+extensions[i];
       }
    }
    throw new Error(`Module not found: Error: Can't resolve '${originalModulePath}' in '${moduleContext}'`);
}
module.exports = Compiler;