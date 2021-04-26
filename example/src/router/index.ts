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
    path: '/rxstorage',
    component: () => import('../views/RxStorageClassView.vue')
  },
  {
    path: '/rxdebounced',
    component: () => import('../views/RxDebouncedView.vue')
  },
  {
    path: '/rxinput',
    component: () => import('../views/RxInputView.vue')
  },
  {
    path: '/rxrest',
    component: () => import('../views/RxRestView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
