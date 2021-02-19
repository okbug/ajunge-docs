export default [
    {
    path: '/',
    component: () => import(/*webpackChunkName:'home'*/'@/views/Home/index.vue') // 会默认代码分割
}, {
    path: '*',
    component:() => import(/*webpackChunkName:'404'*/'@/views/404.vue')
}]