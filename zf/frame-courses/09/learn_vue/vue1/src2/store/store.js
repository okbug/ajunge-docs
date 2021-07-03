import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    count: 100
  },
  mutations: {
    changeCount(state, option) {
      console.log(state, option)
      // state.count....
      // setTimeout(() => {
      state.count += option
      // }, 1000);

    }
  },
  getters: {
    countType(state) {
      return state.count % 2 == 0 ? '偶数' : '奇数'
    }
  },
  actions: {
    changeCountAjax(store, option) {
      setTimeout(() => {
        store.commit('changeCount', option)
      }, 1000);
    }
  },
  modules: {
    qqq: {
      // state
    }
  }

})

export default store
