import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import todo from './modules/todo'

Vue.use(Vuex);

let store = new Vuex.Store({
  state,
  mutations,
  modules: {
    todo: todo
  }
})

export default store