import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../auth/Login.vue')
    },
    {
      path: '/toll-crud',
      name: 'TollCrud',
      component: () => import('../pages/TollCrud.vue'),
    }
  ]
})

export default router
