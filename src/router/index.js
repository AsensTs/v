import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '@views/Home.vue'),
    meta: {
      depth: 1, // 路由层级
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from) => {
  console.log(to, from);
  if (to.name == undefined) {
    router.push('/')
  }
})

export default router
