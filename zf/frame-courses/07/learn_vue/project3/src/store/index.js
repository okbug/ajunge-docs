import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 获取 local中的用户信息
let str = localStorage.getItem('qqquserinfo')
let userInfo = str ? JSON.parse(str) : {};
let userLevel = userInfo.userLevel || '';

export default new Vuex.Store({
  state: {
    userLevel,
    userInfo
  },
  mutations: {
    updateUserInfo(state, options) {
      state.userInfo = options;
      state.userLevel = options.userLevel
    }
  },
  actions: {
  },
  modules: {
  }
})
