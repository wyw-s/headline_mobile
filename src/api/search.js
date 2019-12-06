/**
 * 搜索接口封装
 */
import request from '../utils/request.js'

export const Search = (q) => {
  return request({
    methods: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}
