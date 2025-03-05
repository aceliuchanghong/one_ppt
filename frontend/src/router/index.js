import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import History from '@/views/History.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '创建图表'
    }
  },
  {
    path: '/history',
    name: 'History',
    component: History,
    meta: {
      title: '历史记录'
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router