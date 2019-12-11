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
            <van-button
                size="mini"
                type="default"
                @click="onReplyShow(comment)"
            >回复</van-button>
          </p>
        </div>
        <van-icon
            slot="right-icon"
            color="red"
            :name="comment.is_liking ? 'like' : 'like-o'"
            @click="OnLike(comment)"
        />
      </van-cell>
    </van-list>
    <!-- 评论列表 -->

    <!-- 发布评论 -->
    <van-cell-group class="publish-wrap">
      <van-field
          clearable
          placeholder="请输入评论内容"
          v-model="inputComment"
      >
        <van-button
            slot="button"
            size="mini"
            type="info"
            @click="OnIssue"
        >发布
        </van-button>
      </van-field>
    </van-cell-group>
    <!-- /发布评论 -->
    <!-- 评论弹层 -->
    <!--get-container="body" 挂载到body节点下-->
    <van-popup
        get-container="body"
        round
        v-model="Show_hide"
        position="bottom"
        :style="{ height: '90%' }"
    >
      <!--回复列表-->
      <comment-reply :comment="currentComment"></comment-reply>
      <!--回复列表-->
    </van-popup>
    <!-- 评论弹层 -->
  </div>
</template>

<script>
import {
  getComments,
  PublishArticle,
  CommentLike,
  CancelCommentLike
} from '../../../api/comment'
import CommentReply from './comment-reply'

export default {
  name: 'ArticleComment',
  components: {
    CommentReply
  },
  data () {
    return {
      list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      offset: null, // 获取加载下一页的数据信息
      inputComment: '',
      Show_hide: false,
      currentComment: {} // 存储当前点击回复的评论对象
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
      this.list.push(...data.data.results)
      // loading 加载状态结束
      this.loading = false

      // 判断数据是否全部加载完成
      if (!data.data.results.length) {
        // 全部加载完成停止loading效果；
        this.finished = true
      } else {
        // 若还有数据存在则获取架子啊下页的数据
        this.offset = data.data.last_id
      }
    },
    async OnIssue () {
      const Conment = this.inputComment.trim()
      // 非空判断；
      if (!Conment.length) {
        return
      }
      const { data } = await PublishArticle({
        target: this.$route.params.articleId,
        content: Conment
      })
      // 将发布的消息添加到头部；注意这里不能用...展开；
      this.list.unshift(data.data.new_obj)
      // 发布完成则请空文本框；
      this.inputComment = ''
    },
    async OnLike (comment) {
      // 当前若是喜欢则点击取消点赞
      if (comment.is_liking) {
        await CancelCommentLike(comment.com_id)
      } else {
        await CommentLike(comment.com_id)
      }
      // 修改完毕进行视图的更新；
      comment.is_liking = !comment.is_liking
      // 友好提示；
      this.$toast('操作成功')
    },
    async onReplyShow (comment) {
      this.currentComment = comment
      this.Show_hide = true
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
