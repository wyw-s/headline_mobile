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

// 对文章点赞；
export const ArtileLike = function (ArticleId) {
  return request({
    method: 'POST',
    url: `/app/v1_0/article/likings`,
    data: {
      target: ArticleId
    }
  })
}

// 取消对文章的点赞；
export const CancelLike = function (ArticleId) {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/likings/${ArticleId}`
  })
}

// 取消对文章不喜欢
export const cancelLike = function (articleID) {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/dislikes/${articleID}`
  })
}

// 对文章不喜欢
export const NotLike = function (articleid) {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/dislikes',
    data: {
      target: articleid
    }
  })
}
