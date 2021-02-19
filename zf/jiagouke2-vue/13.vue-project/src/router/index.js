import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 每个模块有自己的路由配置

// 获取当前对应文件夹下的 所有以router.js 结尾的文件

// files就是一个函数  , false 不去遍历子目录
const files = require.context('./routers',false,/\.router.js$/);
const routes = [];
files.keys().forEach(key=>{
  // 获取到文件的内容 拿到默认的导出结果 放到routes里 ， 如果遇到* 号 路由会将* 放到最后面
  routes.push(...files(key).default)
});

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
