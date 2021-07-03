import Vue from 'vue'

import store from './store'
import App from './App1.vue'

new Vue({
  render(h) { return h(App) },
  store
}).$mount('#app')