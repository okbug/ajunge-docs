import applyMixin from "./mixin";
import { forEachValue } from './util';
import ModuleCollection from './module/module-collection'
export let Vue;

/**
 * 
 * @param {*} store  容器
 * @param {*} rootState 根模块 
 * @param {*} path  所有路径
 * @param {*} module 我们刚刚格式化后的结果
 */

function getState(store,path){ // 获取最新的状态 可以保证视图更新
     return path.reduce((newState,current)=>{
        return newState[current];
     },store.state);
}
const installModule = (store, rootState, path, module) => {
    // 这里我要对当前模块进行操作
    // 这里我需要遍历当前模块上的 actions、mutation、getters 都把他定义在

    // 将所有的子模块的状态安装到父模块的状态上 

    // 我要给当前订阅的事件 增加一个命名空间
    let namespace = store._modules.getNamespaced(path); // 返回前缀即可
    // a/changeAge  b/changeAge   a/c/changeAge   path[a] [b] [a,c]
    if(path.length > 0){ // vuex 可以动态的添加模块
        let parent = path.slice(0,-1).reduce((memo,current)=>{
            return memo[current]
        },rootState)
        // 如果这个对象本身不是响应式的 那么Vue.set 就相当于  obj[属性 ]= 值
        Vue.set(parent,path[path.length-1],module.state);
    }
    module.forEachMutation((mutation,key)=>{
        store._mutations[namespace+key] = (store._mutations[namespace+key] || []);
        store._mutations[namespace+key].push((payload)=>{
            mutation.call(store,getState(store,path),payload);
            store._subscribes.forEach(fn=>{
                fn(mutation,store.state); // 用最新的状态 
            })
        })
    })
    module.forEachAction((action,key)=>{
        store._actions[namespace+key] = (store._actions[namespace+key]||[]);
        store._actions[namespace+key].push((payload)=>{
            action.call(store,store,payload)
        })
    })
    module.forEachGetter((getter,key)=>{
        // 模块中getter的名字重复了会覆盖
        store._wrappedGetters[namespace+key] = function () {
            return getter(getState(store,path));
        }
    })
    module.forEachChild((child,key)=>{
        // 递归加载模块
        installModule(store, rootState, path.concat(key), child)
    })
   
}
function resetStoreVM(store,state){
    const computed = {}; // 定义计算属性
    store.getters = {}; // 定义store中的getters
    forEachValue(store._wrappedGetters,(fn,key)=>{
        computed[key] = ()=>{
            return fn();
        }
        Object.defineProperty(store.getters,key,{
            get:()=>store._vm[key] // 去计算属性中取值
        });
    })
    store._vm = new Vue({ 
        data:{
            $$state:state
        },
        computed // 计算属性有缓存效果
    });
}
export class Store { // 容器的初始化
    constructor(options) { // options 就是你new Vuex.Store({state,mutation,actions})
        const state = options.state; // 数据变化要更新视图 （vue的核心逻辑依赖收集）
        this._mutations = {};
        this._actions = {};
        this._wrappedGetters = {};
        this._subscribes = [];
        // 数据的格式化 格式化成我想要的结果 （树）

        // 1.模块收集
        this._modules = new ModuleCollection(options);
        // 根模块的状态中 要将子模块通过模块名 定义在根模块上
        // 2.安装模块
        installModule(this, state, [], this._modules.root);

        // 3,将状态和getters 都定义在当前的vm上
        resetStoreVM(this,state);

        // 插件内部会依次执行
        options.plugins.forEach(plugin=>plugin(this));
    }
    replaceState(state){
        // 替换掉最新的状态
        this._vm._data.$$state = state
    }
    subscribe(fn){
        this._subscribes.push(fn);
    }
    // 在严格模式下  actions 和 mutations是有区别
    commit = (type, payload) => { //保证当前this 当前store实例 
        // 调用commit其实就是去找 刚才绑定的好的mutation
        this._mutations[type].forEach(mutation=>mutation.call(this,payload))
    }
    dispatch = (type, payload) => {
        this._actions[type].forEach(action=>action.call(this,payload))
    }
    get state() { // 属性访问器   new Store().state  Object.defineProperty({get()})
        return this._vm._data.$$state
    }
}


// Vue.use 方法会调用插件的install方法，此方法中的参数就是Vue的构造函数


// Vue.use = function (plugin) {
//     plugin.install(this);
// }
export const install = (_Vue) => { // 插件的安装 Vue.use(Vuex)
    // _Vue 是Vue的构造函数
    Vue = _Vue;
    // 需要将根组件中注入的store 分派给每一个组件 （子组件） Vue.mixin
    applyMixin(Vue);
}