/**
 * 专门用于发送请求处理响应
 */

import axios from 'axios'
import JsonBib from 'json-bigint'
import store from '../store/index.js'
import router from '../router/index.js'

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
    // 统一添加token
    // 获取容器中的token;
    const Token = store.state.Token
    // 判断token 是否存在，若存在则添加到请求头中；
    if (Token) {
      // config.headers.Authorization = `Bearer ${Token.token}`
      // 通过键值对的方式添加token
      config.headers['Authorization'] = `Bearer ${Token.token}`
    }
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
      return {}
    }
  }
]

/**
 * 设置响应拦截器；
 */
request.interceptors.response.use(
  function (response) {
    return response
  },
  async function (error) {
    // 判断如果错误代码为 401 则需要从新获取token
    if (error.response.status === 401) {
      const user = store.state.Token
      // 校验token是否存在或是否有 refresh_token
      if (!user || !user.refresh_token) {
        // 跳转到登录页；
        router.push('/login')
        return
      }
      // 如果有refresh_token，则请求获取新的 token
      try {
        const res = await axios({
          method: 'PUT',
          url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
          headers: {
            Authorization: `Bearer ${user.refresh_token}`
          }
        })
        store.commit('setUser', {
          token: res.data.data.token, // 最新获取的可用 token
          refresh_token: user.refresh_token // 还是原来的 refresh_token
        })
        // 把之前失败的用户请求继续发出去
        // config 是一个对象，其中包含本次失败请求相关的那些配置信息，例如 url、method 都有
        // return 把 request 的请求结果继续返回给发请求的具体位置
        return request(error.config)
      } catch (e) {
        // 如果获取失败，直接跳转 登录页
        router.push('/login')
      }
    }
    return Promise.reject(error)
  }
)

// 导出；
export default request
