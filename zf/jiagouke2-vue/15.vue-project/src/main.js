import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

Vue.directive('has',{ // v-has="'edit'"
  inserted(el,bindings,vnode){
    let exists = vnode.context.$store.state.user.btnPermission[bindings.value];
    if(!exists){
      el.parentNode.removeChild(el);
    }
  }
})


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
