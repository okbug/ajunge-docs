import Vue from 'vue'
// import VueRouter from 'vue-router'
import VueRouter from './myRouter'


Vue.use(VueRouter)

let router = new VueRouter({
  routes: [
    // 路由映射表
    {
      path: '/',
      name: "Home",
      component: () => import(/*webpackChunkName:"home"*/'../components/home.vue')
    },
    {
      path: '/about',
      name: "About",
      meta: {
        level: 10,
        aaa: 23,
        bb: 456,
        title: '345'
      },
      component: () => import(/*webpackChunkName:"about"*/'../components/about.vue'),
      // children: [
      //   {
      //     path: '/about/a',
      //     component: () => import('../../components/HelloWorld.vue')
      //   }
      // ]
    },
    // {
    //   path: '/list/:myid',
    //   name: 'list',
    //   meta: {
    //     aaa: 23,
    //     bb: 456,
    //     title: '345'
    //   },
    //   component: () => import('../components/list.vue')
    // },
    // {
    //   // path: '/*',
    //   // // 404的匹配操作
    //   // // component:()=>import('404.vue')
    //   // redirect: '/about'
    // }
  ],
  // mode: 'history',// hash  利用的是 onhashchange事件； history利用的是 onpoptstate事件 和  pushstate replaceState方法
  base: '/app/',//  配合history使用
  linkActiveClass: 'active',
  linkExactActiveClass: 'qqq'
})
// router.beforeEach((to, from, next) => {
//   /* 
//     登录
//     if(to.path=='/login'){
//       next()
//       return
//     }
//     if(登录了){
//       if(用户的权限 >= to.meta.level){
//         next()
//       }else{
//         next('/404')
//       }
//     }else{
//       next('/login')
//     }




//   */
//   console.log(to, from)
//   document.title = to.meta.title || 'zhufeng'
//   next()
// })
export default router