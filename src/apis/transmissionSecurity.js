import axios from '@utils/axios';

 //输电工作票安全措施
//  transmission_xlyzp: '/api/xlyzp/index', // 获取输电工作票列表
//  transmission_xlyzp_detail: '/api/xlyzp', // 详情信息

export function transmissionXlyzp(params) {
  return axios({
    url: "/api/xlyzp/index",
    method: 'GET',
    params: params
  })
}