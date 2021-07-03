import Vue from 'vue'
import VueRouter from 'vue-router'
// import VueRouter from './myrouter'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/',
    // name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about123" */ '../views/About.vue'),
    meta: {
      title: "关于页",
      level: 4
    }
  },
  {
    path: '/list',
    component: () => import(/*webpackChunkName:"list" */'../views/list.vue'),
    redirect: '/list/a',
    meta: {
      title: "列表页",
      level: 0
    },
    children: [
      {
        path: '/list/a',
        meta: {
          title: "列表页",
          level: 0
        },
        component: () => import('../components/a.vue')
      },
      // {
      //   path: 'b/:name123',
      //   name: "list_b",
      //   component: () => import('../components/b.vue')
      // }
      {
        path: 'b',
        name: "list_b",
        meta: {
          title: "列表页",
          level: 0
        },
        component: () => import('../components/b.vue')
        /* 
        components:{a:()=>,b:()=>{}}
        <router-view name='a'></router-view>
        <router-view name='b'></router-view>
        */
      }
    ]
  },
  {
    path: '/404',
    component: () => import('../views/404.vue')
  },
  {
    path: '/*',
    redirect: '/404'
  }
]
console.log(process.env.NODE_ENV)
const router = new VueRouter({
  // mode: process.env.NODE_ENV == 'development' ? 'hash' : 'history',  //hash: onhashchange  ; history:onpopstate, pushstate replaceState
  // mode: 'history',
  // 使用history模式的时候  需要让后台进行配合  当访问我们前端自己定义的路径的时候 不要返回4040
  // 而是返回 我们的前端页面  index.html
  // base: process.env.BASE_URL,
  // base: '/app/',
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'current'
})

let isLogin = true;
let userLevel = 6;

// router.beforeEach((to, from, next) => {

//   if (isLogin) {
//     // next()
//     // 权限校验
//     if (userLevel < to.meta.level) {
//       next('/404')
//     } else {
//       next()
//     }
//   } else {
//     // 证明没有i登录
//     if (to.path == '/' || to.path == '/login' || to.path == '/404') {
//       // 访问的是不需要登录的页面
//       next()
//     } else {
//       // 访问的是需要登录的页面
//       next('/login')
//     }
//   }
//   console.log(to, from)
//   document.title = to.meta.title || '珠峰'

// })

export default router
