import request from '../utils/request.js'
/**
 * 封装频道的请求接口
 */
// 获取默认推荐频道
export const getDefaultChannels = function () {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}

// 获取全部频道；
export const AllChannels = function () {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}
