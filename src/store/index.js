import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import common from './common'
import user from './user'

export default createStore({
  modules: {
    common,
    user
  },
  plugins: [
    createPersistedState({
      key: 'vuex',
      paths: ['common', 'user']
    })
  ]
})
