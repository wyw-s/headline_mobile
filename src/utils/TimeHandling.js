/**
 * 封装自定义 dayjs 日期处理模块
 */
import Vue from 'vue'
import TimeHandling from 'dayjs'
import 'dayjs/locale/zh-cn' // 按需加载
import relativeTime from 'dayjs/plugin/relativeTime'
TimeHandling.locale('zh-cn') // 全局使用西班牙语
// dayjs 本身只处理日期格式化之类的核心功能
// 其它例如相对时间，需要单独配置它自己的插件才可以使用
TimeHandling.extend(relativeTime)
// 扩展一个全局过滤器：计算相对时间
Vue.filter('relativeTime', value => {
  // TimeHandling() 获取当前最新时间
  // TimeHandling(时间) 它会把你给定的时间转为自己的时间类型
  //   2019-12-3 10:19:37
  //   156156156165
  //   2019
  //   2019-12-3
  return TimeHandling().from(TimeHandling(value))
})
