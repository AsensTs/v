/* eslint-disable no-unused-vars */
import 'babel-polyfill'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastClick from 'fastclick'
import es6Promise from 'es6-promise'
import useVant from "@utils/vant"
import '@styles/common.scss'
import '@styles/reset.css'
import '@styles/border.css'
import 'animate.css'
import '@assets/icon/iconfont/iconfont.css'


const app = createApp(App)

useVant(app.use)
fastClick.attach(document.body) // 移动端点击300毫秒延迟
es6Promise.polyfill()

app.use(store)
app.use(router)
app.mount('#app')


