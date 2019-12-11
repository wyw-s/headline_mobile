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

// 添加评论或评论回复 ；
export const PublishArticle = function (data) {
  return request({
    method: 'POST',
    url: '/app/v1_0/comments',
    data
  })
}

// 对评论或评论回复点赞
export const CommentLike = function (CommentID) {
  return request({
    method: 'POST',
    url: '/app/v1_0/comment/likings',
    data: {
      target: CommentID
    }
  })
}

// 取消对评论或评论回复点赞
export const CancelCommentLike = function (CommentID) {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/comment/likings/${CommentID}`
  })
}
