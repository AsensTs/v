import { getStorage } from '@utils/localStorage';

const state = {
  appTitle: '' || getStorage("common/appTitle")
}

const mutations = {
  'APP_TITLE': (state, value) => {
    state.appTitle = value;
  }
}

const actions = {
  appTitle: ({commit}, value) => {
    commit('APP_TITLE', value)
  }
}

const getters = {
  appTitle: () => state.appTitle
}


export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}