import request from '../utils/request.js'
/**
 * 封装频道的请求接口
 */
export const getDefaultChannels = function () {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}
