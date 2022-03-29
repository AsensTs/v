import axios from '@utils/axios'
import store from '@/store'
const authUser = store.getters['common/authUser']

export function getStationTicket(params) {
  return axios({
    url: "/api/station/ticket/"+ authUser +'/all',
    method: 'GET',
    params: params
  })
}