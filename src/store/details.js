const state = {
  substationCheck_details: false,    // subStationCheck
  permissiongd_details: false,
  schedulingPar_details: false,
  transmissionSecurity_details: false,
  associatedCheck_details: false
}

const mutations = {
  'SUBSTATIONCHECK_DETAILS':(state, value) => {
    state.substationCheck_details = value
  },
  'PERMISSIONGD_DETAILS':(state, value) => {
    state.permissiongd_details = value
  },
  'SCHEDULING_PAR_DETAILS':(state, value) => {
    state.schedulingPar_details = value
  },
  'TRANSMISSION_SECURITY_DETAILS':(state, value) => {
    state.transmissionSecurity_details = value
  },
  'ASSOCIATED_CHECK_DETAILS':(state, value) => {
    state.associatedCheck_details = value
  },
  'CLOSE_DETAILS': (state, type) => {
    if (type) {
      switch(type) {
        case 'substationCheck_details': 
          state.substationCheck_details = false;
          break;
        case 'permissiongd_details': 
          state.permission_details = false;  
          break;
        case 'schedulingPar_details': 
          state.schedulingPar_details = false;
          break;
        case 'transmissionSecurity_details': 
          state.transmissionSecurity_details = false;
          break;
        case 'associatedCheck_details': 
          state.associatedCheck_details = false;
          break;
        default: break;
      }
    } else {
      Reflect.ownKeys(state).forEach(key => {
        state[key] = false;
      })
    }
    
  }
}

const actions = {
  substationCheck_details({ commit }, value) {
    commit('SUBSTATIONCHECK_DETAILS', value);
  },
  permissiongd_details({ commit }, value) {
    commit('PERMISSIONGD_DETAILS', value);
  },
  schedulingPar_details({ commit }, value) {
    commit('SCHEDULING_PAR_DETAILS', value);
  },
  transmissionSecurity_details({ commit }, value) {
    commit('TRANSMISSION_SECURITY_DETAILS', value);
  },
  associatedCheck_details({ commit }, value) {
    commit('ASSOCIATED_CHECK_DETAILS', value);
  },
  close_details({ commit }, type) {
    commit('CLOSE_DETAILS', type);
  }
}

const getters = {
  substationCheck_details: (state) => {
    return state.substationCheck_details;
  },
  permissiongd_details: (state) => {
    return state.permissiongd_details;
  },
  schedulingPar_details: (state) => {
    return state.schedulingPar_details;
  },
  transmissionSecurity_details: (state) => {
    return state.transmissionSecurity_details;
  },
  associatedCheck_details: (state) => {
    return state.associatedCheck_details;
  }
}


export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}