export default [
    {
    path: '/manager',
    component: () => import(/*webpackChunkName:'home'*/'@/views/Manager/index.vue') // 会默认代码分割
}]