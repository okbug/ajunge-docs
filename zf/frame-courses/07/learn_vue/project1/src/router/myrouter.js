let Vue = null;
import link from './LINK.vue'
function install(_vue) {
  Vue = _vue;
  Vue.mixin({
    beforeCreate() {
      if (this.$options.router) {
        this.$router = this.$options.router
      } else if (this.$parent) {
        this.$router = this.$parent.$router
      }
    },
  })
  Vue.component('router-link', link)
  Vue.component('router-view', {
    render(h) {
      // return h('h2', 'hahaha')
      return h(this.$router.routerMap[this.$router._route])
    },
  })
}

class VueRouter {
  constructor(options) {
    let { routes } = options;
    this.routerMap = {};//{'/':home,'/about':about}
    routes.forEach(item => {
      this.routerMap[item.path] = item.component
    })
    Vue.util.defineReactive(this, "_route", '/')
    this._route = location.hash.slice(1);
    window.onhashchange = () => {
      this._route = location.hash.slice(1);
    }
  }
}
VueRouter.install = install

export default VueRouter