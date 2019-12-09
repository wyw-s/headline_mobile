/**
 * 登录模块的Api
 */

import request from '../utils/request.js'

export function login (data) {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}

// 关注用户；
export function Attention (UserID) {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data: {
      target: UserID
    }
  })
}

// 取消关注；
export function CancelAttention (UserID) {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/followings/${UserID}`
  })
}
