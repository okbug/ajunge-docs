export default {
  namespaced: true,
  state: {
    name: "a"
  },
  mutations: {
    changeA(state, name) {
      state.name = name
    }
  }
}