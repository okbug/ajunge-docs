import VueRouter from 'vue-router'
import Vue from 'vue'
Vue.use(VueRouter);
import home from '../views/home'
// import about from '../views/about'

let router = new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: "Home",
      component: home,
      meta: {
        qqq: 214
      }
    }, {
      path: '/about',
      name: "About",
      component: () => import(/*webpackChunkName:"about"*/'../views/about'),
      children: [
        {
          path: '/about/a',
          component: () => import('../components/child')
        }
      ]
    }
  ],
  linkActiveClass: 'current',
  linkExactActiveClass: 'exact-current'
})

router.beforeEach((to, from, next) => {
  console.log(to, from)
  next()
})
export default router