<template>
  <div>
    <!--导航栏-->
    <!--
      back() 路由回退，从哪来回退到哪里
    -->
    <van-nav-bar
        :title="title"
        left-arrow
        class="left_arrow"
        @click-left="$router.back()"
    />
    <!--联想建议列表-->
    <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
    >
      <van-cell
          v-for="item in list"
          :key="item.art_id.toString()"
          :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
import { SearchResult } from '../../api/search'

export default {
  name: 'search_index',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1
    }
  },
  computed: {
    title () {
      return `${this.$route.params.q}  的搜索结果`
    }
  },
  methods: {
    // 内容不满一屏，函数就会执行
    async onLoad () {
      // 异步更新数据
      const { data } = await SearchResult({
        q: this.$route.params.q,
        page: this.page,
        per_page: 20
      })
      this.list.push(...data.data.results)
      // 加载状态结束
      this.loading = false
      // 数据全部加载完毕则提示无法加载更多了；
      if (!data.data.results.length) {
        this.finished = true
      } else {
        this.page++
      }
    }
  }
}
</script>

<style lang=less scoped>
  .left_arrow {
    .van-icon {
    color: #fff;
    }
    .van-nav-bar__title {
      color: #fff;
    }
  }

</style>
