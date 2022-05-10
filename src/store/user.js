import { login, login_validate, user_type, user_logout } from '@apis/user.js'
import { setToken, removeToken } from '@utils/auth';
import { Toast } from 'vant';
import { getStorage } from '@utils/localStorage';

const state = {
  authName: '' || getStorage('user/authName')
}

const mutations = {
  'LOGIN': (state, value) => {
    state.authName = value;
  },
  'LOGOUT': (state) => {
    console.log("退出登录", state.authName);
  }
}

const actions = {
  login: ({commit}, data) => {
    const { username, password } = data;
    return new Promise((reslove, reject) => {
      // 登录用户验证
      login_validate({userName: username}).then((res) => {
        if (res.data) {
          Toast.fail(res.data);
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
              commit('LOGIN', username);
              Toast.success("登陆成功！");
              reslove();
            }
          })
        })
        .catch(error => {
          Toast.fail("登陆失败,用户名或密码错误！");
          reject(error)
        })
      }).catch(error => {
        reject(error)
      })
    })
  },
  logout({commit}) {
    
    return new Promise((reslove, reject) => {
      user_logout().then(() => {
        removeToken();
        commit('LOGOUT');
        reslove();
      }).catch((error)=>{
        reject(error)
      })
    })
  }
}

const getters = {
  authUser: (state) => state.authName
}


export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}