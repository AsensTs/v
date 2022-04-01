import { getStorage } from '@utils/localStorage';

const state = {
  appTitle: '' || getStorage("common/appTitle"),
  activeNavIndex: 1
}

const mutations = {
  'APP_TITLE': (state, value) => {
    state.appTitle = value;
  },
  'NAV_ACTIVE': (state, value) => {
    state.activeNavIndex = value; 
  }
}

const actions = {
  appTitle: ({commit}, value) => {
    commit('APP_TITLE', value)
  },
  activeNavIndex: ({commit}, value) => {
    commit('NAV_ACTIVE', value)
  }
}

const getters = {
  appTitle: () => state.appTitle,
  activeNavIndex: () => state.activeNavIndex
}


export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}