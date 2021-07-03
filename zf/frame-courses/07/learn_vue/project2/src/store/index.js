import { createStore } from 'vuex'

export default createStore({
  state: {
    count: 100
  },
  mutations: {
    changeCOunt(state, option) {
      state.count += option
    }
  },
  actions: {
  },
  modules: {
  }
})
