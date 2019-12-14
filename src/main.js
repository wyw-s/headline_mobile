import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastClick from 'fastclick'
// 加载Vant组件js文件；
import './utils/register-vant.js'
// 加载amfe-flexible 模块，以设置基准rem的值
import 'amfe-flexible'
import './utils/request.js'
import './styles/index.less'
import './utils/TimeHandling.js'

Vue.config.productionTip = false
fastClick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
