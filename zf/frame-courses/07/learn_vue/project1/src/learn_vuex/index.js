import Vue from 'vue'
import App from './routerApp.vue'
import store from './store'
import router from './router'

// 全局混入   给每一个组件都合并了一个配置对象
// Vue.mixin({
//   data() {
//     return {
//       hello: 123 //  若 这里的属性名 跟组件中的属性重复了 咋办？以组件的数据为准
//     }
//   },
//   created() {
//     // 若  组件中也有 created钩子函数， 那么 组件的钩子函数会 后执行
//     console.log('mixincreated')
//   },
// })
// 局部混入   在组建中 写 mixins :[{配置对象},{配置对象}]
Vue.component('qqqq', {
  render(h) {
    return <h1>hahah</h1>
  }
})
let vm = new Vue({
  render(h) {
    return h(App)
  },
  store,
  router: router
}).$mount('#app')


// console.log(vm)