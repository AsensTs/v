import { login, login_validate, user_type } from '@apis/user.js'
import { Notify } from 'vant';
import { setToken } from '@utils/auth'

const state = {
  username: '',
  password: ''
}

const mutations = {
  'LOGIN': (state, data) => {
    state.username = data.username;
    state.password = data.password;
  }
}

const actions = {
  login: async ({commit}, data) => {
    const { username, password } = data;
    return new Promise((reslove, reject) => {
      // 登录用户验证
      login_validate({userName: username}).then((res) => {
        if (res.data) {
          Notify({ type: 'danger', message: res.data });
          return;
        }
        
        let formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);
        login(formData).then(() => {
          user_type().then((res) => {
            if (res.code == 200 && res.data && res.data.userName) {
              setToken("authName", res.data.userName);
              setToken("userType", res.data.type);
              setToken("gsbds", res.data.gsbds);
              setToken("gsyw", res.data.gsyw);
              commit('LOGIN', data);
              Notify({ type: 'success', message: "登陆成功！" });
              reslove();
            } else {
              Notify({ type: 'danger', message: "登陆失败,用户名或密码错误！" });
            }
          })
        })
      }).catch(error => {
        reject(error)
      })
    })
  }
}

const getters = {
  getUser: () => state.username
}


export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}