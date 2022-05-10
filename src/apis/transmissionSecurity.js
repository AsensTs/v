import axios from '@utils/axios';

export function transmissionXlyzp(params) { // 获取输电工作票列表
  return axios({
    url: "/api/xlyzp/index",
    method: 'GET',
    params: params
  })
}

export function jxsqdDetails(ticketid) { // 检修单详情
  return axios({
    url: '/api/jxsqd/details/' + ticketid,
    method: 'GET'
  })
}