import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/rxclass',
    component: () => import('../views/RxClassView.vue')
  },
  {
    path: '/rxstorageclass',
    component: () => import('../views/RxStorageClassView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
