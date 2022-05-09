import axios from '@utils/axios'

export function associatedOPerTicket(params) {
  return axios({
    url: '/api/operation/ticket/index',
    method: 'GET',
    params: params
  })
}

export function associatedDetails(instId) {
  return axios({
    url: '/api/operation/associations/details/' + instId,
    method: 'GET',
  })
}

export function relationStationTicket(instId) {
  return axios({
    url: '/api/operation/association_station_ticket/' + instId,
    method: 'GET',
  })
}

export function associatedUnbindTicket(lsdx) { 
  return axios({
    url: '/api/operation/associations/unbind/' + lsdx,
    method: 'POST',
  })
}

export function accociatedTicketList(params) { 
  return axios({
    url: '/api/operation/order/tickets/',
    method: 'GET',
    params: params
  })
}

export function associatedManualBindTicket(instId, inst_id) {  //关联变电操作
  return axios({
    url: '/api/operation/manual_association_station_ticket/' + instId +'/'+ inst_id,
    method: 'POST',
  })
}

export function accociatedStationTicket(lsdx) { // 获取关联变电票详情
  return axios({
    url: '/api/station/ticket/' + lsdx,
    method: 'GET'
  })
}

export function accociatedSTOrders(lsdx) { // 获取关联变电票详情列表
  return axios({
    url: '/api/station/ticket/orders/' + lsdx,
    method: 'GET'
  })
}