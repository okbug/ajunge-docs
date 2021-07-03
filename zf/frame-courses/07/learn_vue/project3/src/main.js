import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Plugin } from 'vue-fragment'
Vue.use(Plugin)
import './util/ui'
import './directives'

Vue.config.productionTip = false

let userLevel = store.state.userLevel
let whiteList = ['/login', '/404']
router.beforeEach((to, from, next) => {
  // 登录的校验
  if (userLevel) {
    if (to.meta.level.includes(userLevel)) {
      next()
    } else {
      next('/404')
    }
  } else {
    // 没有登录
    //  /login  /404
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }

  document.title = to.meta.title || '珠峰'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
