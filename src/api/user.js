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

// 展示当前登录用户信息
export function getSelf () {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
  })
}

// 获取用户个人资料
export const getUserInfo = function () {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/profile'
  })
}

// 编辑用户个人资料
export const EdilUserInfo = function (data) {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/profile',
    data
  })
}

// 编辑用户照片资料
export const updateUserPhoto = function (data) {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/photo',
    data
  })
}
