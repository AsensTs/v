import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '@components/home'),
    meta: {
      depth: 1, // 路由层级
    }
  },
  {
    path: '/substationCheck',
    name: 'substationCheck',
    component: () => import(/* webpackChunkName: "about" */ '@components/substationCheck'),
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
  console.log(`to: ${to.path}` , `from: ${from.path}`);
  if (to.name == undefined) {
    router.push('/')
  }
})

export default router
