import App from './3_App.vue'
import Vue from 'vue'
// console.log(App)
// Vue.component('my-button', {
//   render(h) {
//     return h('button', 'hello')
//   }
// })
import './common/common.js'
Vue.filter('qq', function (val) {
  return 'qqq' + val
})
Vue.directive('color', function (el, obj) {
  // obj.value 是 指令后边跟的哪个值
  // console.log("el, obj")
  el.style.color = obj.value || 'red'
})
Vue.directive('permission', {
  inserted(el, obj) {
    // console.log(1111111, obj)
    if (!obj.value) {
      el.parentNode.removeChild(el)
    }
  }
})

new Vue({
  render: h => h(App)
}).$mount('#app')

