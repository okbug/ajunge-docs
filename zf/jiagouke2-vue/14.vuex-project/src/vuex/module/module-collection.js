import { forEachValue } from "../util";
import Module from './module'
class ModuleCollection{
    constructor(options){ 
        this.register([],options);
    }
    getNamespaced(path){
        let root = this.root; // 从根模块找起来
        return path.reduce((str,key)=>{ // [a,c]
            root = root.getChild(key); // 不停的去找当前的模块
            return str + (root.namespaced?key + '/' :'' ) 
        },''); // 参数就是一个字符串
    }
    register(path,rootModule){  // [a,   c]   [b]
        let newModule = new Module(rootModule)
       
        if(path.length == 0){
            // 根模块
            this.root = newModule; // this.root就是树根
        }else{ 
            let parent = path.slice(0,-1).reduce((memo,current)=>{
                return memo.getChild(current)
            },this.root)
            parent.addChild(path[path.length-1],newModule);
        }
        if(rootModule.modules){
            // 循环模块 [a] [b]
            forEachValue(rootModule.modules,(module,moduleName)=>{
                // [a,c]
                this.register(path.concat(moduleName),module)
            })
        }
    }
}


export default ModuleCollection;



/**
 * this.root = {
 *    _raw: '根模块',
 *    _children:{
 *        a:{
 *          _raw:"a模块",
 *          _children:{
 *              c:{
 *                  .....
 *              }
 *          },
 *          state:'a的状态'  
 *        },
 *        b:{
 *          _raw:"b模块",
 *          _children:{},
 *          state:'b的状态'  
 *        }
 *    },
 *    state:'根模块自己的状态'
 * }
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */