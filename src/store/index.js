import { createStore } from 'vuex'
import common from './common'
import user from './user'

export default createStore({
  modules: {
    common,
    user
  }
})
