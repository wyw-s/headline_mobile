<template>
  <div class="home">
    <!--
      NavBar 导航栏 组件
    -->
    <van-nav-bar title="首页" fixed/>
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
                v-for="(art, index) in Channel.news"
                :key="index"
                :title="art.title"
                class="imgstyle"
            >
              <van-grid :border="false" :column-num="3">
                <van-grid-item
                    v-for="(img,index) in art.cover.images"
                    :key="index"
                >
                  <van-image height="80" :src="img"/>
                </van-grid-item>
              </van-grid>
              <div class="article-info">
                <span>{{Channel.aut_name}}</span>
                <span>{{Channel.comm_count}}评论</span>
                <span>{{ Channel.pubdate | relativeTime }}</span>
              </div>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <!--tabs 组件提供的nav-right插槽-->
      <div class="wap-nav" slot="nav-right" @click="isChannelEditShow = true">
        <van-icon name="wap-nav"/>
      </div>
    </van-tabs>
    <!--弹窗组件-->
    <van-popup
        :round="true"
        v-model="isChannelEditShow"
        position="bottom"
        closeable
        close-icon-position="top-left"
        :style="{ height: '93%' }"
        @open="onChannelOpen"
    >
      <div class="channel-container">
        <van-cell
            title="我的频道"
            :border="false"
        >
          <van-button
              type="danger"
              size="mini"
              @click="isEdit = !isEdit "
          >{{ isEdit? '完成' : '编辑' }}</van-button>
        </van-cell>
        <van-grid :column-num="4" :gutter="10">
          <van-grid-item
              v-for="(Channel, index) in ChannelList"
              :key="Channel.id"
              :text="Channel.name"
              @click="OnDelete(Channel, index)"
          >
            <!--slot="icon" 宫格的具名插槽-->
            <van-icon
                slot="icon"
                name="close"
                size="20px"
                class="close-icon"
                v-show="isEdit && Channel.name !== '推荐'"
            />
          </van-grid-item>
        </van-grid>
        <van-cell title="推荐频道" :border="false"/>
        <van-grid :column-num="4" :gutter="10">
          <van-grid-item
              v-for="AllChannel in RmChannelList"
              :key="AllChannel.id"
              :text="AllChannel.name"
              @click="OnAddCnannel(AllChannel)"
          />
        </van-grid>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getDefaultChannels, AllChannels } from '../../api/channel.js'
import { Getnews } from '../../api/NewList.js'

export default {
  name: 'home_index',
  data () {
    return {
      active: 0, // 当前点击频道的索引
      ChannelList: [], // 频道列表
      isChannelEditShow: false, // 弹窗的开启与关闭
      AllChannels: [],
      isEdit: false
    }
  },
  created () {
    // 页面加载获取频道列表
    this.GetChannels()
  },
  computed: {
    // 判断全部频道中的每一项和我的频道是否有相同的，有则剔除；
    RmChannelList () {
      const arr = []
      this.AllChannels.forEach(Channels => {
        const arr_ = this.ChannelList.find(item => {
          // 返回的是相同的项
          return item.id === Channels.id
        })
        // 如果我的频道里面包含当前项则跳过，反之则添加到数组中；
        if (!arr_) {
          arr.push(Channels)
        }
      })
      return arr
    }
  },
  methods: {
    // 获取频道列表函数
    async GetChannels () {
      console.log(this.ChannelList)
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
    },

    // 获取全部频道，弹出窗打开时触发；
    async onChannelOpen () {
      const { data } = await AllChannels()
      this.AllChannels = data.data.channels
    },

    // 点击添加频道，点击获取当前频道信息，然后把当前频道数据添加到我的频道中；
    // 由于计算属性的存在所以，推荐频道的数据会自动发生变化
    OnAddCnannel (AllChannel) {
      this.ChannelList.push(AllChannel)
    },
    OnDelete (Channel, index) {
      // 判断当前的状态按钮的状态。并去除推荐的点击删除功能；
      if (this.isEdit && Channel.name !== '推荐') {
        // 当前是编辑状态则点击删除
        this.ChannelList.splice(index, 1)
      } else if (!this.isEdit) {
        // 如果是非编辑状态点击则关闭弹窗，并切换到相对应的频道页面；
        this.isChannelEditShow = false
        this.active = index
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .home {
    position: relative;

    /*图片*/

    .imgstyle {
      flex-direction: column;

      .article-info span {
        margin-right: 10px;
      }
    }

    /* 导航栏*/

    .van-tabs {
      // 频道列表
      /deep/ .van-tabs__wrap {
        position: fixed;
        top: 46px;
        z-index: 2;
        right: 0;
        left: 0;
      }

      // 频道内容
      /deep/ .van-tabs__content {
        margin-top: 90px;
      }
    }

    /*面包按钮*/

    .wap-nav {
      position: sticky;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      opacity: 0.8;
    }

    .channel-container {
      margin-top: 30px;
      .van-grid-item {
        position: relative;
      }
      /deep/ .van-grid-item__icon-wrapper {
        position: absolute;
        right: -8px;
        top: -17px;
      }
    }
  }

</style>
