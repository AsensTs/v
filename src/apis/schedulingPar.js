import axios from '@utils/axios';


export function predictateTicket(params) {
  return axios({
    url: '/api/predictate/index',
    method: 'GET',
    params: params
  })
}

export function predictateTicketDetails (instId) {
  return axios({
    url: '/api/predictate/details/' + instId,
    method: 'GET'
  })
}

export function predictateTicketAgainCheck (instId) {
  return axios({
    url: '/api/predictate/again_check/' + instId,
    method: 'GET'
  })
}

export function messageSearch (instId) {
  return axios({
    url: '/api/message/index',
    method: 'GET',
    params: {
      type: 'VALIDATION_PREDICTATE_MESSAGE',
      ticketId: instId
    }
  })
}
