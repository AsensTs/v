/* eslint-disable no-unused-vars */
import 'babel-polyfill'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import es6Promise from 'es6-promise'
import useElIcon from '@utils/element'
import '@styles/common.scss'
import '@styles/reset.css'
import 'animate.css'
import '@assets/icon/iconfont/iconfont.css'

const app = createApp(App)

useElIcon(app.component)
es6Promise.polyfill()

app.use(store)
app.use(router)
app.mount('#app')


