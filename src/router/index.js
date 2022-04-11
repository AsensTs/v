import { createRouter, createWebHashHistory } from 'vue-router'
import { navigator } from '@/config'
import store from '@/store'
import Layout from '@layout' 

const setNavigator = () => {
  let nav= []
  if (navigator) {
    navigator.forEach((item) => {
      nav.push({
        path: `/${item.name}`,
        name: item.name,
        component: () => import(/* webpackChunkName: "about" */ `@views/${item.name}`),
        meta: item.meta
      })
    })
  }
  return nav;
}

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Layout,
    redirect: '/substationCheck',
    children: setNavigator()
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

  // close search page
  store.dispatch('search/close_search');
  store.dispatch('details/close_details');

  if (to.name == undefined) {
    router.push('/')
  }
})

export default router
