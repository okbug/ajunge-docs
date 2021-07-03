let Vue = null;
function install(_Vue) {
  Vue = _Vue;
  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        // 证明this是new出来的哪个跟实例
        this.$store = this.$options.store
      } else if (this.$parent) {
        // 证明 是那些后代组件
        this.$store = this.$parent.$store
      }
    },
  })
}

class Store {
  constructor(options) {
    // this.state = options.state
    let vm = new Vue({
      data() {
        return {
          state: options.state
        }
      },
    })
    this.state = vm.state;


    this.mutations = {};
    let mutations = options.mutations;
    Object.keys(mutations).forEach(key => {
      this.mutations[key] = (option) => {
        mutations[key].call(this, this.state, option)
      }
    })
    // Action自己实现

    this.getters = {};
    let getters = options.getters || {};
    Object.keys(getters).forEach(key => {
      Object.defineProperty(this.getters, key, {
        get: () => {
          console.log('get')
          return getters[key].call(this, this.state)
        }
      })
    })

  }
  commit(mutationsFnName, option) {
    this.mutations[mutationsFnName](option)
  }

}

export function mapState(ary) {
  let obj = {};
  ary.forEach(key => {
    obj[key] = function () {
      return this.$store.state[key]
    }
  })
  return obj
}
// mapMutations  mapActions mapGetters


export default {
  install,
  Store
}