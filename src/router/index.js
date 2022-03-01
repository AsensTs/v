import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '@views/Home.vue'),
    meta: {
      depth: 1
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
