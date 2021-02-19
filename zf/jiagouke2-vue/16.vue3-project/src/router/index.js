import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home/index.vue'

const routes = [
  {
    path:'/',
    component:Home
  },
  {
    path:'/plan',
    component:()=>import('@/views/Plan/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router


