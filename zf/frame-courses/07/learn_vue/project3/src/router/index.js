import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      level: ['master', 'supermaster', 'curstom'],
      title: '首页'
    },
    // redirect: '/about', // about是所有权限都能查看的
    children: [
      {
        path: '/about',
        name: 'About',
        meta: {
          title: "关于",
          icon: 's-grid',
          level: ['supermaster']
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      },
      {
        path: '/user',
        name: "User",
        meta: {
          title: "用户中心",
          icon: 'user',
          level: ['master', 'supermaster']
        },
        component: () => import(/* webpackChunkName: "User" */ '../views/User.vue')

      },
      {
        path: '/list',
        name: "List",
        meta: {
          title: "列表页",
          icon: 'document',

          level: ['supermaster']
        },
        component: () => import(/* webpackChunkName: "User" */ '../views/List.vue')

      },
      // {
      //   path: '/goods/red',
      //   name: "RED",
      //   component: () => import(/* webpackChunkName: "User" */ '../views/List.vue')
      // }
      {
        path: '/goods',
        name: "GOODS",
        meta: {
          title: "商品列表",
          icon: 's-grid',

          level: ['master', 'supermaster', 'curstom']
        },
        component: () => import(/* webpackChunkName: "GOODS" */ '../views/Goods.vue'),
        children: [
          {
            path: '/goods/red',
            name: "RED",
            meta: {
              title: "红苹果",
              icon: 's-grid',

              level: ['master', 'supermaster']
            },
            component: () => import(/* webpackChunkName: "GOODS" */ '../components/goods/red.vue'),
          },
          {
            path: '/goods/green',
            name: "green",
            meta: {
              title: "绿苹果",
              icon: 's-grid',

              level: ['master', 'supermaster', 'curstom']
            },
            component: () => import(/* webpackChunkName: "green" */ '../components/goods/green.vue'),
          },
          {
            path: '/goods/yellow',
            name: "yellow",
            meta: {
              title: "黄香蕉",
              icon: 's-grid',

              level: ['master', 'supermaster', 'curstom']
            },
            component: () => import(/* webpackChunkName: "yellow" */ '../components/goods/yellow.vue'),
          },
          {
            path: '/goods/sweet',
            name: "sweet",
            meta: {
              title: "甜不甜",
              icon: 's-grid',

              level: ['master', 'supermaster']
            },
            component: () => import(/* webpackChunkName: "sweet" */ '../components/goods/sweet.vue'),
          }
        ]
      },
      {
        path: '/department',
        name: 'department',
        meta: {
          title: "部门管理",
          icon: 'office-building',

          level: ['master', 'supermaster']
        },
        component: () => import(/* webpackChunkName: "department" */ '../views/Department.vue')
      }
    ]
  },
  {
    path: '/login',
    name: "Login",
    meta: {
      level: ['master', 'supermaster', 'curstom']
    },
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/*',
    meta: {
      level: ['master', 'supermaster', 'curstom']
    },
    component: () => import(/* webpackChunkName: "NoFound" */ '../views/NoFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
/* 
  后台返回路由映射表  前端 再自己的映射表中 之编写几个不用任何权限就能访问的路径
  然后根据后台请求道的数组  用 router.addRoute的方式添加新的路由
  这种添加 要注意的是  /*的这种写法一定要通过add的方式最后添加
*/




export default router
