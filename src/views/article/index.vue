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
        <van-image round width="2rem" height="2rem" fit="fill" :src="article.article_details.aut_photo" />
        <div class="text">
          <p class="name">{{article.article_details.aut_name}}</p>
          <p class="time">{{article.article_details.pubdate | relativeTime}}</p>
        </div>
        <van-button
            round
            size="small"
            type="info"
        >+ 关注</van-button>
      </div>
      <div class="content" v-html="article.article_details.content"></div>
      <div class="zan">
        <van-button round size="small" hairline type="primary" plain icon="good-job-o">点赞</van-button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <van-button round size="small" hairline type="danger" plain icon="delete">不喜欢</van-button>
      </div>
    </div>
    <!-- /文章详情 -->

    <!-- 加载失败的消息提示 -->
    <div class="error" v-else>
      <p>网络超时，点击 <a href="#" @click.prevent="loadArticle">刷新</a> 试一试。</p>
    </div>
    <!-- /加载失败的消息提示 -->
  </div>
</template>

<script>
import { getartile } from '../../api/NewList.js'
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
