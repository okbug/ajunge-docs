import Vue from 'vue'
import Vuex from 'vuex'
import { getCart } from '../api/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('newbeetoken') || '',
    cartNum: 0,
    cartItemIds: localStorage.getItem('cartItemIds') || '',
  },
  mutations: {
    updateToken(state, str) {
      state.token = str;
      localStorage.setItem('newbeetoken', str)
    },
    updateCartNum(state, num) {
      state.cartNum = num;
    },
    updateCartItemIds(state, str) {
      state.cartItemIds = str;
      localStorage.setItem('cartItemIds', str)
    }
  },
  actions: {
    updateCartNum(store) {
      getCart().then(data => {
        // console.log(data)
        store.commit('updateCartNum', data.data.length)
      })
    }
  },
  modules: {
  }
})
