import Vue from 'vue'
// import VueX from 'vuex'
import VueX from '../myvuex'
import a from './modules/a'

Vue.use(VueX)

let store = new VueX.Store({
  state: {
    count: 100,
    // pageFormA: local || {},
    list: []
  },
  mutations: {
    changeCount(state, num) {

      state.count += num
    },
    changeA() {
      console.log(6666)
    }
  },
  actions: {
    asyncChangeCount(store, num) {
      setTimeout(() => {
        store.commit('changeCount', num)
      }, 1000);
    }
  },
  getters: {
    // 就是 vuex的一个计算属性
    type(state) {
      return state.count % 2 ? '技术' : '偶数'
    }

  },
  modules: {
    aaa: a //根的  调用  $store.state.count; 模块中的调用 $store.state.aaa.xxx
  }
})

export default store