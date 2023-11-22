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
    },
    {
      path: '/lane-crud',
      name: 'LaneCrud',
      component: () => import('../pages/LaneCrud.vue'),
    },
    {
      path: '/vehicle-crud',
      name: 'VehicleCrud',
      component: () => import('../pages/VehicleCrud.vue'),
    },
    {
      path: '/shift-crud',
      name: 'ShiftCrud',
      component: () => import('../pages/ShiftCrud.vue'),
    },
    {
      path: '/user-crud',
      name: 'UserCrud',
      component: () => import('../pages/UserCrud.vue'),
    },
    {
      path: '/receipt-crud',
      name: 'ReceiptCrud',
      component: () => import('../pages/ReceiptCrud.vue'),
    },
    {
      path: '/page-not-found',
      name: '404',
      component: () => import('../pages/404.vue'),
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/page-not-found'
    }
  ]
})

export default router
