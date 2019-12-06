import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/index.vue'
import Tabbar from '../views/tabbar/index.vue'
import Home from '../views/home/index.vue'
import Search from '../views/search'
import SearchResult from '../views/search-result'

Vue.use(VueRouter)

// 配置路由表
const routes = [
  // 登录页
  {
    name: 'login',
    path: '/login',
    component: Login
  },
  // 首页
  {
    path: '/',
    component: Tabbar,
    children: [
      {
        path: '', // 默认子路由
        component: Home
      }
    ]
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/search/:q',
    component: SearchResult
  }
]

const router = new VueRouter({
  routes
})

export default router
