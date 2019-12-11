import Vue from 'vue'
import Vuex from 'vuex'
import { SetStorage, GetStorage } from '../utils/storage.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 若本地有token数据则页面加载就要获取
    // 若没有 token 则就是null
    Token: GetStorage('login_token')
  },
  mutations: {
    /**
     * 利用Vuex的数据共享来储存token以在任何地方都可以访问，
     * 但是有一个缺陷，就是刷新页面后token不被保留，所以同样要利用，
     * 本地储存技术来永久的储存token数据；
     */
    SetUser (state, data) {
      // 把获取到的token储存到本地；
      /**
       * state 里面的数据只能通过mutations修改，
       * 所以如果页面加载的时候没获取到 token 数据，
       * 那么后面如果没有mutations的修改的话，state的数据便不会再更新 始终为null
       * 除非页面刷新重新加载获取数据
       */
      state.Token = data
      SetStorage('login_token', state.Token)
    }
  },
  actions: {
  },
  modules: {
  }
})
