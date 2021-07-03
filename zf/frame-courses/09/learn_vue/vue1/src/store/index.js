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
      // this 是 store
      state.count += option
    }
  }

})
