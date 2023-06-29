import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/SputterPmView.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/PmManagerView',
    name: 'PmManagerView',
    component: () => import('../views/PmManagerView.vue')
  },
  {
    path: '/PmSummaryView',
    name: 'PmSummaryView',
    component: () => import('../views/PmSummaryView.vue')
  },
  {
    path: "/SputterEqpView",
    name: "SputterEqpView",
    component: () => import('../views/SputterEqpView.vue')
  },
  {
    path:"/SputterBatchHistoryView",
    name: "SputterBatchHistoryView",
    component: () =>import('../views/SputterBatchHistoryView.vue')
  },
  {
    path:"/YieldView",
    name: "YieldView",
    component: () =>import('../views/YieldView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
