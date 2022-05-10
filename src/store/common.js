// import { getStorage } from '@utils/localStorage';

const state = {
  appTitle: '',
  activeNavIndex: 1
}

const mutations = {
  'APP_TITLE': (state, value) => {
    console.log(value, 'vuex');
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
  appTitle: (state) => state.appTitle,
  activeNavIndex: (state) => state.activeNavIndex
}


export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}