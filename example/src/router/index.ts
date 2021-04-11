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
    component: () => import('../views/RxDebouncedView.vue')
  },
  {
    path: '/rxrestclass',
    component: () => import('../views/RxRestView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
