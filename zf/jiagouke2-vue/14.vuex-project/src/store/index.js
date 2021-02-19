import Vue from 'vue';
import Vuex from '@/vuex';
// import Vuex from 'vuex';
// 1.Vue.use(Vuex);  Vuex是一个对象 install方法
// 2.Vuex中有一个Store类 
// 3.混入到组件中 增添store属性
import a from './a.js';
import b from './b.js'

// import logger from 'vuex/dist/logger'

// plugins subscribe replaceState
function persists() {
    return function(store) { // store是当前默认传递的
        let data = localStorage.getItem('VUEX:STATE');
        if (data) {
            store.replaceState(JSON.parse(data));
        }
        store.subscribe((mutation, state) => {
            localStorage.setItem('VUEX:STATE', JSON.stringify(state));
        })
    }
}

Vue.use(Vuex); // 使用这个插件  内部会调用Vuex中的install方法
const store = new Vuex.Store({
    plugins: [
        // logger(),  // vuex-persists
        persists()
    ],
    state: { // -> data
        age: 10,
    },
    getters: { // 计算属性
        myAge(state) {
            return state.age + 20
        }
    },
    mutations: { // method=> 同步的更改state  mutation的参数是状态
        changeAge(state, payload) {
            state.age += payload; // 更新age属性
        }
    },
    actions: { // 异步操作做完后将结果提交给mutations
        changeAge({ commit }, payload) {
            setTimeout(() => {
                commit('changeAge', payload)
            }, 1000);
        }
    },
    modules: {
        a,
        b
    }
});
export default store;