/**
 * 封装文章评论接口
 */

import request from '../utils/request'

// 获取评论或评论回复
export const getComments = function (params) {
  return request({
    method: 'GET',
    url: '/app/v1_0/comments',
    params
  })
}
