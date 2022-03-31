/* eslint-disable no-unused-vars */
import router from './router'
import store from './store'
import { Toast } from 'vant';
import { getToken } from '@utils/auth' // get token from cookie
import getPageTitle from '@utils/get-page-title'

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach((to, from, next) => {
  // set page title
  document.title = getPageTitle(to.meta.title);
  
  // determine whether the user has logged in
  const hasToken = getToken();

  if (hasToken) {
    if (to.path == '/login') {
      Toast.success("已登录！");
      next({ path: '/home' });
    } else {
      next();
    }
  } else {
    /* has no token*/

    // 自动登录
    // await store.dispatch({username: '骆国铭', password: 'key@1234'})

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next();
    } else {
      // redirect 
      next({path: '/login'})
    }
  }
})
