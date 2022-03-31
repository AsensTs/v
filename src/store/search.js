
const state = {
  ssc_search: false,    // subStationCheck
}

const mutations = {
  'SSC_SEARCH':(state, value) => {
    state.ssc_search = value
  },
  'CLOSE_SEARCH': (state) => {
    Reflect.ownKeys(state).forEach(key => {
      state[key] = false;
    })
  }
}

const actions = {
  ssc_search({ commit }, value) {
    commit('SSC_SEARCH', value);
  },
  close_search({ commit }) {
    commit('CLOSE_SEARCH');
  }
}

const getters = {
  ssc_search: (state) => {
    return state.ssc_search;
  }
}


export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}