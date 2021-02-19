export default [
   {
    path:'/login',
    component:()=>import(/*webpackChunkName:'login'*/'@/views/User/login.vue') // 会默认代码分割
   },
   {
    path:'/reg',
    component:()=>import(/*webpackChunkName:'reg'*/'@/views/User/reg.vue') // 会默认代码分割
   },
   {
    path:'/forget',
    component:()=>import(/*webpackChunkName:'forget'*/'@/views/User/forget.vue') // 会默认代码分割
   }
]