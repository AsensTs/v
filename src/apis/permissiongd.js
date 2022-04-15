import axios from '@utils/axios'

export function getPermissiongd(params) {
  return axios({
    url: "/api/permission_gd/index",
    method: 'GET',
    params: params
  })
}

// 获取校核结果
export function getPCheckResult (instId, params) {
  return axios({
    url: "/api/permission_gd/check_result/" + instId,
    method: 'GET',
    params: params
  })
}