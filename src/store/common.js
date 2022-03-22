const state = {
  authUser: '佛山供电局'
}

const mutations = {
  'AUTH_USER': (state, value) => {
    state.authUser = value;
  }
}

const actions = {
  authUser: ({commit}, value) => {
    commit('AUTH_USER', value)
  }
}

const getters = {
  authUser: () => state.authUser
}


export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}