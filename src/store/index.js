import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import common from './common'
import user from './user'
import search from './search'
import details from './details'

export default createStore({
  modules: {
    common,
    user,
    search,
    details
  },
  plugins: [
    createPersistedState({
      key: 'vuex',
      paths: ['common', 'user']
    })
  ]
})
