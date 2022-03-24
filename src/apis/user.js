import axios from '@utils/axios'

export function login (data) {
  return axios.post('/login', data) // 登录
}

export function login_validate (data) {
  return axios({
    url: '/api/user/validate', // 登录验证
    method: 'POST',
    data: data
  })
}

export function user_type () {
  return axios({
    url: '/api/user/current',  // 获取用户类型
    method: 'GET',
  })
}