<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
    >
      <van-cell
          v-for="comment in list"
          :key="comment.com_id.toString()"
          :title="comment.content"
      >
        <van-image
            slot="icon"
            round
            width="30"
            height="30"
            style="margin-right: 10px;"
            :src="comment.aut_photo"
        />
        <span style="color: #466b9d;" slot="title">{{ comment.aut_name}}</span>
        <div slot="label">
          <p style="color: #363636;">{{ comment.content }}</p>
          <p>
            <span style="margin-right: 10px;">{{ comment.pubdate | relativeTime }}</span>
            <van-button size="mini" type="default">回复</van-button>
          </p>
        </div>
        <van-icon slot="right-icon" name="like-o"/>
      </van-cell>
    </van-list>
    <!-- 评论列表 -->

    <!-- 发布评论 -->
    <van-cell-group class="publish-wrap">
      <van-field
          clearable
          placeholder="请输入评论内容"
      >
        <van-button slot="button" size="mini" type="info">发布</van-button>
      </van-field>
    </van-cell-group>
    <!-- /发布评论 -->
  </div>
</template>

<script>
import { getComments } from '@/api/comment'
export default {
  name: 'ArticleComment',
  props: {},
  data () {
    return {
      list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      offset: null // 获取加载下一页的数据信息
    }
  },

  methods: {
    async onLoad () {
      // 开始请求
      const { data } = await getComments({
        type: 'a',
        source: this.$route.params.articleId,
        offset: this.offset
      })
      // 把响应的数据添加到数组中；
      this.list.push(...data.data.result)
      // loading 加载状态结束
      this.loading = false

      // 判断数据是否全部加载完成
      if (!data.data.result.length) {
        // 全部加载完成停止loading效果；
        this.finished = true
      } else {
        // 若还有数据存在则获取架子啊下页的数据
        this.offset = data.data.last_id
      }
    }
  }
}
</script>

<style scoped lang='less'>
  .publish-wrap {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
  }

  .van-list {
    margin-bottom: 45px;
  }
</style>
