<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
        fixed
        left-arrow
        @click-left="$router.back()"
        title="文章详情"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <!-- 加载中 loading -->
    <van-loading class="article-loading" v-if="loading" />
    <!-- /加载中 loading -->

    <!-- 文章详情 -->
    <div class="detail" v-else-if="article.article_details.title">
      <h3 class="title">{{article.article_details.title}}</h3>
      <div class="author">
        <van-image
            round
            width="2rem"
            height="2rem"
            fit="fill"
            :src="article.article_details.aut_photo"
        />
        <div class="text">
          <p class="name">{{article.article_details.aut_name}}</p>
          <p
              class="time"
          >
            {{article.article_details.pubdate | relativeTime}}
          </p>
        </div>
        <van-button
            round
            size="small"
            type="info"
            @click="OnAttention(article.article_details.is_followed)"
        >
          {{ article.article_details.is_followed ? '取消关注' : '+ 关注'}}
        </van-button>
      </div>
      <div class="content" v-html="article.article_details.content"></div>
      <div class="zan">
        <van-button
            round
            size="small"
            hairline
            type="primary"
            plain
            icon="good-job-o"
            @click="OnArticlelike(article.article_details.attitude)"
        >{{ article.article_details.attitude === 1 ? '取消点赞' : '点赞' }}</van-button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <van-button
            round
            size="small"
            hairline
            type="danger"
            plain
            icon="delete"
            @click="OnLike(article.article_details.attitude)"
        >{{ article.article_details.attitude === 0 ? '取消不喜欢' : '喜欢' }}</van-button>
      </div>
    </div>
    <!-- /文章详情 -->

    <!-- 加载失败的消息提示 -->
    <div class="error" v-else>
      <p>
        网络超时，点击
        <a href="#" @click.prevent="loadArticle">刷新
        </a> 试一试。
      </p>
    </div>
    <!-- /加载失败的消息提示 -->
  </div>
</template>

<script>
import {
  getartile,
  ArtileLike,
  CancelLike,
  cancelLike,
  NotLike
} from '../../api/NewList.js'
import { Attention, CancelAttention } from '../../api/user'

export default {
  name: 'ArticleIndex',
  props: {
    articleId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      loading: true, // 控制加载中的 loading 状态
      article: {
        title: 'hello world',
        article_details: [] // 文章详情
      }
    }
  },
  created () {
    this.LoadArticle_details()
  },
  methods: {
    async LoadArticle_details () {
      try {
        const { data } = await getartile(this.articleId)
        this.article.article_details = data.data
      } catch (e) {
      }
      // 无论请求是否成功都需要停止加载状态；
      this.loading = false
    },
    // 关注与取消关注
    async OnAttention (boolean) {
      // 获取用户id；
      const userid = this.article.article_details.aut_id
      // 如果已关注，则取消关注；
      if (boolean) {
        await CancelAttention(userid)
      } else {
        await Attention(userid)
      }
      // 关注修改完成后要进行视图的更新
      // 1、从新渲染整个页面进行视图的更新；
      // this.LoadArticle_details()
      // 2、仅改变单个组件的样式；
      this.article.article_details.is_followed =
        !this.article.article_details.is_followed
    },
    // 对文章喜欢与不喜欢
    async OnLike (type) {
      // 获取文章id；
      const aricleid = this.article.article_details.art_id
      // 如果是喜欢则取消喜欢；
      if (!type) {
        await cancelLike(aricleid)
        this.article.article_details.attitude = -1
      } else {
        await NotLike(aricleid)
        this.article.article_details.attitude = 0
      }
    },
    // 对文章点赞与不点赞
    async OnArticlelike (type) {
      // 获取文章id；
      const aricleid = this.article.article_details.art_id
      // 如果已点赞，则取消点赞
      if (type === 1) {
        await CancelLike(aricleid)
        this.article.article_details.attitude = -1
      } else {
        await ArtileLike(aricleid)
        this.article.article_details.attitude = 1
      }
    }
  }
}
</script>

<style scoped lang='less'>
  .article-container{
    position: absolute;
    left: 0;
    top: 0;
    overflow-y: scroll;
    width: 100%;
    height: 100%;
  }
  .article-loading {
    padding-top: 100px;
    text-align: center;
  }
  .error{
    padding-top: 100px;
    text-align: center;
  }
  .detail {
    padding: 50px 10px;
    .title {
      font-size: 16px;
    }
    .zan{
      text-align: center;
    }
    .author {
      padding: 10px 0;
      display: flex;
      .text {
        flex: 1;
        padding-left: 10px;
        line-height: 1.3;
        .name {
          font-size: 14px;
          margin: 0;
        }
        .time {
          margin: 0;
          font-size: 12px;
          color: #999;
        }
      }
    }
    .content {
      overflow: hidden;
      white-space: pre-wrap;
      word-break: break-all;
      /deep/ img{
        max-width:100%;
        background: #f9f9f9;
      }
    }
  }
</style>
