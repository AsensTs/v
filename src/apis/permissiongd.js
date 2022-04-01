import axios from '@utils/axios'

export function getPermissiongd(params) {
  return axios({
    url: "/api/permission_gd/index",
    method: 'GET',
    params: params
  })
}