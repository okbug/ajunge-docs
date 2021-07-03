let Vue;
// 每一个组件都会有一个$store的属性
function install(_vue) {
  Vue = _vue;
  Vue.mixin({
    // Vuex 是通过 mixin结合beforeCreate钩子函数 实现了每一个组件
    // 身上都有对应的$store
    beforeCreate() {
      // this 是每一个组件
      if (this.$options.store) {
        this.$store = this.$options.store
      } else if (this.$parent && this.$parent.$store) {
        this.$store = this.$parent.$store
      }
    },
  })
}

class Store {
  constructor(options) {
    let vm = new Vue({
      data: {
        state: options.state
      }
    })
    this.state = vm.state


    this.mutations = {};
    let mutations = options.mutations || {};
    Object.keys(mutations).forEach(key => {
      this.mutations[key] = (option) => {
        mutations[key].call(this, this.state, option)
      }
    })
  }
  // this.$store.commit('changeCOunt,10)
  commit(type, option) {
    this.mutations[type](option)
  }
}

export default {
  install,
  Store
}