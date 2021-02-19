import applyMixin from "./mixin";
import { forEachValue } from './util';
export let Vue;
export class Store { // 容器的初始化
    constructor(options) { // options 就是你new Vuex.Store({state,mutation,actions})
        const state = options.state; // 数据变化要更新视图 （vue的核心逻辑依赖收集）
        // 响应式的数据 new Vue({data})
        // 1.添加状态逻辑  数据在哪使用 就会收集对应的依赖
        const computed = {}
        // 2.处理getters属性 具有缓存的 computed 带有缓存 （多次取值是如果值不变是不会重新取值）
        this.getters = {};
        forEachValue(options.getters, (fn, key) => {
            computed[key] = () => { // 将用户的getters 定义在实例上， 计算属性是如何实现环翠
                return fn(this.state)
            }
            Object.defineProperty(this.getters, key, { // 当我取值时 执行计算属性的逻辑
                get: () => this._vm[key]
            })
        });
        // 3.计算属性的实现
        this._vm = new Vue({
            data: { // 属性如果是通过$开头的 默认不会将这个属性挂载到vm上
                $$state: state // 会将$$state 对应的对象 都通过defineProperty来进行属性劫持
            },
            computed
        });
        // 4.实现mutations 
        this.mutations = {};
        this.actions = {}
        forEachValue(options.mutations, (fn, key) => {
            // this.mutations = {myAge:(payload)=>用户定义的逻辑(state,payload)}
            this.mutations[key] = (payload) => fn(this.state, payload);
        });
        // 5.实现actions
        forEachValue(options.actions, (fn, key) => {
            this.actions[key] = (payload) => fn(this, payload);
        });
    }
    // 在严格模式下  actions 和 mutations是有区别
    commit = (type, payload) => { //保证当前this 当前store实例 
        // 调用commit其实就是去找 刚才绑定的好的mutation
        this.mutations[type](payload)
    }
    dispatch = (type, payload) => {
        this.actions[type](payload);
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