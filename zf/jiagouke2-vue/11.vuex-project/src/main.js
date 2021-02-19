import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
Vue.config.productionTip = false

new Vue({
  store, // 每个子组件，都会拥有一个属性$store
  render: h => h(App),
}).$mount('#app')


