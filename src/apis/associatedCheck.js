import axios from '@utils/axios'

export function associatedOPerTicket(params) {
  return axios({
    url: '/api/operation/ticket/index',
    method: 'GET',
    params: params
  })
}