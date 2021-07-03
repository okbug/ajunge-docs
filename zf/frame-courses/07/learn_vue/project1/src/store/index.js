import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// 看传递的参数中能不能找到一个 install的方法 找到就执行 没找到
// 再去查看  参数是不是一个函数  是函数就执行  
// 其他不管


let aaa = {
  namespaced: true,
  state: {
    username: "zhufeng"
  },
  mutations: {
    changeName(state, option) {
      state.username = '6666'
    }
  }
}

export default new Vuex.Store({
  state: {
    // 放置的是一些公用数据
    count: 100
  },
  mutations: {
    // 放置的都是用来改变数据的方法
    // 这里变得函数 必须都得是一些同步函数 // 原则(不是技术限制)
    // tongtong
    add(state, option) {
      // 最多俩参数 最少一个
      console.log(this)
      state.count += option
    },
    minus(state) {
      state.count -= 3
    },
    // asyncAdd(state) {
    //   setTimeout(() => {
    //     state.count += 120
    //   }, 1000);
    // }
  },
  actions: {
    // 通过 store.dispatch(函数名,xxx) 触发这里的函数
    asyncAdd(store, option) {
      // 最多俩参数 最少一个
      // store 就是new 出来的 vuex实例
      setTimeout(() => {
        store.commit('add', option)
      }, 1000);
    }
  },
  modules: {
    qqq: aaa
  }
})
