import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      keepAlive:true,
      // transitionName:'Analyze'
    }
  },
  {
    path: '/analyze',
    name: 'Analyze',
    component: () => import('../views/Analyze.vue'),
    meta: {
      keepAlive:true,
      // transitionName:'Analyze'
    }
  },
  {
    path: '/extension',
    name: 'Extension',
    component: () => import('../views/Extension.vue'),
    meta: {
      keepAlive:true,
      // transitionName:'Extension'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
