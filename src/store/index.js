import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import common from './common'
import user from './user'
import search from './search'

export default createStore({
  modules: {
    common,
    user,
    search
  },
  plugins: [
    createPersistedState({
      key: 'vuex',
      paths: ['common', 'user']
    })
  ]
})
