import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.mixin({
  data() {
    return {
      mixName: "混入的name",
      name: "01932834234"
    }
  },
  created() {
    this.name = 7777
    console.log("混入的created")
  },
  methods: {
    mixFn() {
      console.log('混入的方法')
    }
  },
})

new Vue({
  router,
  store,
  render: (createElement) => {
    return createElement(App)
  }
}).$mount('#app')
