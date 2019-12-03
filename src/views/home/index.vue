<template>
  <div>
    <!--
      NavBar 导航栏 组件
    -->
    <van-nav-bar title="标题"/>
    <!--
      Tab 标签页 组件<==>频道列表
    -->
    <van-tabs v-model="active">
      <van-tab
          v-for="Channel in ChannelList"
          :title="Channel.name"
          :key="Channel.id"
      >
        <!--
          PullRefresh 下拉刷新 组件
          <van-pull-refresh> 标签内的代码 有误或响应没回来则会一直刷新
        -->
        <van-pull-refresh v-model="Channel.isLoading" @refresh="onRefresh">
          <!--
            List 列表 组件
          -->
          <van-list
              v-model="Channel.loading"
              :finished="Channel.finished"
              finished-text="没有更多了"
              @load="onLoad"
          >
            <van-cell
                v-for="item in Channel.news"
                :key="item.aut_id"
                :title="item.title"
            />
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getDefaultChannels } from '../../api/channel.js'
import { Getnews } from '../../api/NewList.js'

export default {
  name: 'home_index',
  data () {
    return {
      active: 0, // 当前点击频道的索引
      ChannelList: [] // 频道列表
    }
  },
  created () {
    // 页面加载获取频道列表
    this.GetChannels()
  },
  methods: {
    // 获取频道列表函数
    async GetChannels () {
      const { data } = await getDefaultChannels()
      const List = data.data.channels
      /**
       * 由于每一个频道都有对应的新闻，所以需要再点击切换频道的时候，
       * 请求加载相对应的新闻数据；
       * 解决：
       *  在每一个频道数据中追加一条，相对应新闻数据；
       */
      List.forEach(function (item) {
        // 追加新闻数据；
        item.news = [] // 频道对应的新闻列表
        /**
         * 由于一个频道的数据加载或结束，并不代表其他频道的数据加载结束；
         * 所以需要把上拉加载更多(loading,finished)作用在每个新闻页;
         * 同时上拉刷新 isLoading 也应该作用在每个新闻页；
         */
        item.loading = false // 上拉刷新
        item.finished = false // 上拉刷新
        item.isLoading = false // 下拉刷新
        item.pre_timestamp = null // 储存用于获取下一页的时间戳
      })
      // 把处理过的数据重新赋值给 ChannelList
      this.ChannelList = List
    },
    /**
     * 页面加载时如果当前新闻页的内容没有铺满一个屏幕，则会一直触发 onLoad 事件；
     * 若数据全部加载完毕则 finished = true ;
     */
    async onLoad () {
      /**
       * 加载新闻列表信息；
       */
      // 获取当前频道对象；
      const ChannelNew = this.ChannelList[this.active]
      // 调用请求的方法：获取新闻响应数据
      const { data } = await Getnews({
        channel_id: ChannelNew.id, // 频道id
        // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
        timestamp: ChannelNew.pre_timestamp || Date.now(),
        with_top: 1
      })
      /**
       * 函数的第一次的调用会在空数组中添加响应回来的数据，
       * 当第二次加载时，会再一次向数组中添加响应回来的数据(从后添加)
       */
      ChannelNew.news.push(...data.data.results)
      // 加载状态结束
      ChannelNew.loading = false
      // 若响应回来的数据还有事件戳，则表明数据还有数据可以加载，
      // 反之，则表明数据已经全部加载完毕了；
      if (data.data.pre_timestamp) {
        ChannelNew.pre_timestamp = data.data.pre_timestamp
      } else {
        ChannelNew.finished = true
      }
    },
    async onRefresh () {
      // 获取当前频道对象；
      const ChannelNew = this.ChannelList[this.active]
      // 调用请求的方法：获取新闻响应数据
      const { data } = await Getnews({
        channel_id: ChannelNew.id, // 频道id
        // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
        timestamp: Date.now(), // 刷新获取的都是最新的数据；
        with_top: 1
      })
      // 把响应的数据从前存到数组中；
      ChannelNew.news.unshift(...data.data.results)
      ChannelNew.isLoading = false
      this.$toast('刷新成功')
    }
  }
}
</script>

<style scoped>

</style>
