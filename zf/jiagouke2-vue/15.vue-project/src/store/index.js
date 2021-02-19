import Vue from 'vue'
import Vuex from 'vuex'
import rootModule from './rootModule'
Vue.use(Vuex)

// 模块需要划分的
// require.context 读取文件目录构造出我要的结构
const files = require.context('./modules', false, /\.js$/);
// 自动根据当前store中的模块名解析vuex中的状态
files.keys().forEach(key => { // [./article.js,./user.js]
    let moduleName = key.replace(/\.\//, '').replace(/\.js/, '');
    let store = files(key).default; // node语法 想获取es6的结果.default
    let module = rootModule.modules = (rootModule.modules || {});
    module[moduleName] = store;
    // 命名空间 
    module[moduleName].namespaced = true; // 不加空间没有作用域
});

export default new Vuex.Store(rootModule)