import Vue from 'vue'
// import Vuex from 'vuex'
import Vuex from './myvuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 100
  },
  mutations: {
    changeCount(state, option) {
      state.count += option
    }
  },
  getters: {
    type(state) {
      return state.count % 2 ? "技术" : "偶数"
    }
  }
})