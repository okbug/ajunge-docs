let Vue = null;
function install(_Vue) {
  Vue = _Vue;
  Vue.mixin({
    beforeCreate() {
      // 这个钩子函数的执行顺序是 父子孙
      // console.log(this)
      if (this.$options.store) {
        // 证明这个是在入口文件中的 new  Vue的那次实例
        this.$store = this.$options.store
      } else if (this.$parent) {
        // 证明这时后代组件
        this.$store = this.$parent.$store
      }
    },
  })
}

class Store {
  constructor(options) {
    // this.state = option.state || {}
    let vm = new Vue({
      data: {
        state: options.state || {}
      }
    })
    this.state = vm.state;

    this.mutations = {};
    let mutations = options.mutations || {};
    Object.keys(mutations).forEach(key => {
      this.mutations[key] = (option) => {
        mutations[key].call(this, this.state, option)
      }
    })

    this.actions = {};
    let actions = options.actions || {};
    Object.keys(actions).forEach(key => {
      this.actions[key] = (option) => {
        actions[key].call(this, this, option)
      }
    })


    this.getters = {};
    let getters = options.getter || {};
    Object.keys(getters).forEach(key => {
      Object.defineProperty(this.getters, key, {
        get: () => {
          return getters[key].call(this, this.state)
        }
      })
    })
  }
  commit(mutationFnName, option) {
    this.mutations[mutationFnName](option)
  }
  dispatch(actionFnName, option) {
    this.actions[actionFnName](option)
  }
}


function mapState(ary = []) {
  let obj = {};
  ary.forEach(key => {
    obj[key] = function () {
      // this是当前的组件
      this.$store.state[key]
    }
  })
  return obj
}
//  自己实现 mapMutations mapActions mapGetters
export default {
  install,
  Store,
  mapState
}