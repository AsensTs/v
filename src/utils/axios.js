// 封装axios
import axios from 'axios'
import qs from 'qs'
import store from "@/store/index"
import router from '@/router/index'

// 数据请求字符
axios.defaults.baseURL = process.VUE_APP_ENV_API_URL;
// 请求超时，中断
axios.defaults.timeout = 5000;
// 表示跨域请求时是否需要使用凭证
axios.defaults.withCredentials = false;
// axios.defaults.headers.common['token'] =  AUTH_TOKEN
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
// 允许跨域
axios.defaults.headers.post["Access-Control-Allow-Origin-Type"] = "*";


// 请求拦截器
axios.interceptors.request.use(config => {     
  if (config.method === "post" || config.method === "put" || config.method === "delete") {
    config.data = qs.parse(config.data);
  }

  // 每次发送请求之前判断vuex中是否存在token
  // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
  // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
  const token = store.state.token;
  token && (config.headers.Authorization = token);
  return config;
}, error => {
  console.error(error);
  return Promise.reject(error);
})


// 响应拦截
axios.interceptors.response.use(response => {
  if (response.status === 200 || response.status === 204) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(response)
  }
}, 
error => {
  if (error.response.status) {
    switch (error.response.status) {
      case 400:
        console.error("发出的请求有错误，服务器没有进行新建或修改数据的操作: " + error.response.status);
        break;
      case 401: 
        //重定向
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        console.error("token:登录失效==>" + error.response.status + ":" + store.state.token)
        router.replace({
          path: '/Login',
        });
        break;
      case 403:
        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token和清空vuex中token对象
        // 跳转登录页面 
        console.error("用户得到授权，但是访问是被禁止的: " + error.response.status)
        break;
      case 404:
        console.error("网络请求不存在: " + error.response.status)
        break;
      case 406:
        console.error("请求的格式不可得: " + error.response.status)
        break;
      case 410:
        console.error("请求的资源被永久删除，且不会再得到的: " + error.response.status)
        break;
      case 422:
        console.error("当创建一个对象时，发生一个验证错误: " + error.response.status)
        break;
      case 500:
        console.error("服务器发生错误，请检查服务器: " + error.response.status)
        break;
      case 502:
        console.error("网关错误: " + error.response.status)
        break;
      case 503:
        console.error("服务不可用，服务器暂时过载或维护: " + error.response.status)
        break;
      case 504:
        console.error("网关超时: " + error.response.status)
        break;
      default:
        console.error("其他错误错误: " + error.response.status)
    }
    return Promise.reject(error.response);
  } else {
    // 处理断网的情况
    // eg:请求超时或断网时，更新state的network状态
    // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
    // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
    store.commit('changeNetwork', false);
  }
})

export default axios;