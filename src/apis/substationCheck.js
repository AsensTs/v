import axios from '@utils/axios'
import store from '@/store'
const authUser = store.getters['user/authUser']

export function getStationTicket(params) {
  return axios({
    url: "/api/station/ticket/"+ authUser +'/all',
    method: 'GET',
    params: params
  })
}

export function getSTCheckResult(id) {
  return axios({
    url: "/api/ticket_check/getStationTicketCheckResult/" + id,
    method: 'GET'
  })
}

export function substationAgainTicketCheck(id) {
  return axios({
    url: "/api/station/again_ticket_check/" + id,
    method: 'GET'
  })
}

export function ticketStateCheck(id) {
  return axios({
    url: "/api/ticket_check/" + id + '/checkStationState',
    method: 'GET'
  })
}

export function stationOperationCheck(id) {
  return axios({
    url: "/api/ticket_check/" + id + '/checkOperation',
    method: 'GET'
  })
}