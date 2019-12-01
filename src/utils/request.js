/**
 * 专门用于发送请求处理响应
 */

import axios from 'axios'
import JsonBib from 'json-bigint'

/**
 * 封装 axios 函数
 */
/**
 * axios 的一个方法 .create ==>复制了一个axios，
 * 在复制的axios上进行操作只对复制的起作用；
 */
const request = axios.create({
  // 设置基础基地址；
  baseURL: 'http://ttapi.research.itcast.cn/'
})

/**
 * 设置请求拦截器；
 */
request.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

/**
 * 配置处理后端数据中超出 JS 安全整数范围问题；
 * transformResponse 在传递给 then/catch 前，允许修改响应数据
 */
request.defaults.transformResponse = [
  function (data) {
    try {
      return JsonBib.parse(data)
    } catch (e) {
      console.log(e)
      return {}
    }
  }
]

/**
 * 设置响应拦截器；
 */
request.interceptors.response.use(
  function (response) {
    console.log(response)
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 导出；
export default request
