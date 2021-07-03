import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'

Vue.use(VueRouter)

const routes = [

  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/search',
    name: "Search",
    component: () => import(/* webpackChunkName: "search" */ '../views/Search.vue')
  },
  {
    path: '/product/:goodsId',
    name: 'product',
    component: () => import(/* webpackChunkName: "product" */ '../views/Product.vue')
  },
  {
    path: '/',
    component: Index,
    children: [
      {
        path: '/',
        name: "Home",
        component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue')
      },
      {
        path: '/list',
        name: "List",
        component: () => import(/* webpackChunkName: "List" */ '../views/List.vue')
      },
      {
        path: '/cart',
        name: "Cart",
        component: () => import(/* webpackChunkName: "Cart" */ '../views/Cart.vue')
      },
      {
        path: '/user',
        name: "User",
        component: () => import(/* webpackChunkName: "User" */ '../views/User.vue')
      }
    ]
  },
  {
    path: '/address',
    name: 'address',
    component: () => import(/* webpackChunkName: "address" */ '../views/Address.vue')
  },
  {
    path: '/addressedit',
    name: 'addressedit',
    component: () => import(/* webpackChunkName: "addressedit" */ '../views/AddressEdit.vue')
  },
  {
    path: '/create_order',
    name: 'create_order',
    component: () => import(/* webpackChunkName: "create_order" */ '../views/CreateOrder.vue')
  },
  {
    path: '/order',
    name: 'order',
    component: () => import(/* webpackChunkName: "order" */ '../views/Order.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'current',
  linkExactActiveClass: 'current-exact',
  base: process.env.BASE_URL,
  routes
})

export default router
