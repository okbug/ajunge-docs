import Vue from 'vue';
import store from '@/store'
let userLevel = store.state.userLevel;
Vue.directive('permission', {
  inserted(el, { value }) {
    if (!value.includes(store.state.userLevel)) {
      el.parentNode.removeChild(el)
    }
  }
})