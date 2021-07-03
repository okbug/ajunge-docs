import Vue from 'vue'
import App from './app2.vue'
// import glo from './common/global.vue'
// console.log(glo)

// Vue.component(glo.name, glo)
import './common/global.js'
import store from './store/store'
import router from './router/router'

// Vue.directive('color', {
//   bind() {
//     console.log('bind')
//   },
//   inserted() {
//     console.log('inserted')
//   },
//   update() {
//     console.log('update')
//   }
// })


Vue.directive('color', function (el, obj) {
  // console.log(el, obj)
  el.style.color = obj.value || '#333'
})



new Vue({
  store: store,
  router,
  render(h) {
    return h(App)
  }
}).$mount('#app')