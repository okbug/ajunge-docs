let Vue = null;
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

  Vue.component('router-link', {
    props: {
      to: {
        require: true
      }
    },
    render(h) {
      return h('a', {
        attrs: {
          href: "#" + this.to
        }
      }, this.$slots.default)
      // return <a href={'#' + this.to}>{this.$slots}</a>
    }
  })
  Vue.component('router-view', {
    render(h) {
      return h(this.$router.routerMap[this.$router._route])
    }
  })
}

class VueRouter {
  constructor(options) {
    let { routes } = options;
    this.routerMap = {};//{'\':home,'\about':about}
    routes.forEach(key => {
      this.routerMap[key.path] = key.component
    })
    window.onload = () => {
      location.hash = location.hash || '/'
      this._route = location.hash.slice(1)
    }
    // this._route = location.hash.slice(1)
    Vue.util.defineReactive(this, '_route', '/')
    window.onhashchange = () => {
      this._route = location.hash.slice(1)
    }
  }
}
VueRouter.install = install;

export default VueRouter