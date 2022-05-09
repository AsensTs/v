import axios from '@utils/axios';

 //调度操作票扫描
//  predictate_ticket: '/api/predictate/index', // table
//  predictate_ticket_details: '/api/predictate/details/', // 详情
//  predictate_ticket_again_check: "/api/predictate/again_check/", //重新扫描
// message_search: '/api/message/index', // 短信查询

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