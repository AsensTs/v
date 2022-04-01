
const state = {
  substationCheck_search: false,    // subStationCheck
  permission_search: false,
  schedulingPar_search: false,
  transmissionSecurity_search: false,
  associatedCheck_search: false
}

const mutations = {
  'SUBSTATIONCHECK_SEARCH':(state, value) => {
    state.substationCheck_search = value
  },
  'PERMISSION_SEARCH':(state, value) => {
    state.permission_search = value
  },
  'SCHEDULING_PAR_SEARCH':(state, value) => {
    state.schedulingPar_search = value
  },
  'TRANSMISSION_SECURITY_SEARCH':(state, value) => {
    state.transmissionSecurity_search = value
  },
  'ASSOCIATED_CHECK_SEARCH':(state, value) => {
    state.associatedCheck_search = value
  },
  'CLOSE_SEARCH': (state) => {
    Reflect.ownKeys(state).forEach(key => {
      state[key] = false;
    })
  }
}

const actions = {
  substationCheck_search({ commit }, value) {
    commit('SUBSTATIONCHECK_SEARCH', value);
  },
  permission_search({ commit }, value) {
    commit('PERMISSION_SEARCH', value);
  },
  schedulingPar_search({ commit }, value) {
    commit('SCHEDULING_PAR_SEARCH', value);
  },
  transmissionSecurity_search({ commit }, value) {
    commit('TRANSMISSION_SECURITY_SEARCH', value);
  },
  associatedCheck_search({ commit }, value) {
    commit('ASSOCIATED_CHECK_SEARCH', value);
  },
  close_search({ commit }) {
    commit('CLOSE_SEARCH');
  }
}

const getters = {
  substationCheck_search: (state) => {
    return state.substationCheck_search;
  },
  permission_search: (state) => {
    return state.permission_search;
  },
  schedulingPar_search: (state) => {
    return state.schedulingPar_search;
  },
  transmissionSecurity_search: (state) => {
    return state.transmissionSecurity_search;
  },
  associatedCheck_search: (state) => {
    return state.associatedCheck_search;
  }
}


export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}