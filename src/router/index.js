import { createRouter, createWebHashHistory } from 'vue-router'

import Layout from '@layout' 

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Layout,
    children: [
      {
        path: '/substationCheck',
        name: 'substationCheck',
        component: () => import(/* webpackChunkName: "about" */ '@views/substationCheck'),
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '@views/login'),
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
