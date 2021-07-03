import Vue from 'vue'
import store from './store'
import app from './app.vue'

let obj = {
  created() {
    console.log('混入的 created：', this)
  },
  data() {
    return {
      name: "hello"
    }
  },
}
Vue.mixin(obj)// 把这个对象合并到每一个组建的配置对象当中
// 以组件本身的数据为主
// 混入的时候 若钩子函数 重复了 则 混的钩子先执行  组件自己的钩子后执行
let vm = new Vue({
  render: h => h(app),
  store: store
}).$mount('#app')
