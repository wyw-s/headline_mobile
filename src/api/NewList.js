/**
 * 封装文章类请求
 */
import request from '../utils/request.js'

export const Getnews = function (params) {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}
