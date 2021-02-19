import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default () => {
    let store = new Vuex.Store({
        state: {
            name: 'jw'
        },
        mutations: {
            changeName(state, payload) {
                state.name = payload;
            }
        },
        actions: {
            changeName({ commit }, payload) {
                return new Promise((resolve,reject)=>{
                    setTimeout(() => {
                        commit('changeName', payload);
                        resolve();
                    }, 1000);
                })
            }
        }
    });

    // 前端运行时会执行此方法 ，用服务端的状态替换掉前端的状态
    if(typeof window !=='undefined' && window.__INITIAL_STATE__){
        store.replaceState(window.__INITIAL_STATE__)
    }


    return store; // 导出容器
}