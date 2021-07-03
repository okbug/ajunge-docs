import { createApp } from 'vue'
import App from './App2.vue'
import haha from './components/haha.vue'
import router from './router'
import store from './store'
let app = createApp(App);
app.component('haha', haha)
app.config.globalProperties.$http = '$http'
app.use(router)
app.use(store)
app.mount('#app')
// createApp(App).use(store).use(router).mount('#app')


/*
  import http from './http'
  Vue.prototype.$http = http
  this.$http()


*/
