/**
 * 搜索接口封装
 */
import request from '../utils/request.js'

// 联想建议
export const Search = (q) => {
  return request({
    methods: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}

// 搜索结果
export const SearchResult = (params) => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search',
    params
  })
}
