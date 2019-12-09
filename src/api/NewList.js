/**
 * 封装文章类请求
 */
import request from '../utils/request.js'

// 获取文章列表；
export const Getnews = function (params) {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}

// 获取文章详情；
export const getartile = function (id) {
  return request({
    method: 'GET',
    url: `/app/v1_0/articles/${id}`
  })
}
