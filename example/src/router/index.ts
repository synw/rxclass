import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: "/rxclass"
  },
  {
    path: '/rxclass',
    component: () => import('../views/RxClassView.vue')
  },
  {
    path: '/rxstorageclass',
    component: () => import('../views/RxStorageClassView.vue')
  },
  {
    path: '/rxdebouncedclass',
    component: () => import('../views/RxdebouncedView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
