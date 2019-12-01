/**
 * 登录模块的Api
 */

import request from '../utils/request.js'

export function login (data) {
  return request({
    method: 'POST',
    url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
    data
  })
}
