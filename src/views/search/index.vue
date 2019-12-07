<template>
  <div>
    <!--搜索框-->
    <form action="/">
      <van-search
          v-model="SearchText"
          placeholder="请输入搜索关键词"
          show-action
          shape="round"
          @input="Oninput"
      >
        <!--@search="OnSearch"-->
        <div slot="action" @click="OnSearch(SearchText)">搜索</div>
      </van-search>
    </form>
    <!--联想建议-->
    <van-cell-group
        :border="false"
        v-show="SearchText"
    >
      <van-cell
          v-for="item in AssociateList"
          :key="item"
          icon="search"
          @click="OnSearch(item)"
      >
        <span slot="title" v-html="highlight(item)"></span>
      </van-cell>
    </van-cell-group>
    <!--搜索历史记录-->
    <van-cell-group v-show="!SearchText">
      <van-cell
          title="历史记录"
          value="内容"
          :border="false"
      >
        <div v-show="isDeleteShow">
          <span @click="searchHistories = []">全部删除</span>&nbsp;&nbsp;
          <span @click="isDeleteShow = false">完成</span>
        </div>
        <van-icon
            name="delete"
            v-show="!isDeleteShow"
            @click="isDeleteShow = true"
        />
      </van-cell>
      <van-cell
          :title="item"
          v-for="(item, index) in searchHistories"
          :key="item"
      >
        <van-icon
            name="delete"
            v-show="isDeleteShow"
            @click="searchHistories.splice(index, 1)"
        />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { Search } from '../../api/search.js'
import { GetStorage, SetStorage } from '../../utils/storage'

export default {
  name: 'search-index',
  data: function () {
    return {
      SearchText: '', // 搜索关键字
      AssociateList: [], // 联想建议列表
      searchHistories: GetStorage('search-histories') || [], // 搜索历史记录
      isDeleteShow: false
    }
  },
  watch: {
    searchHistories () {
      SetStorage('search-histories', this.searchHistories)
    }
  },
  methods: {
    /**
     * 搜索历史记录：
     *    点击开始搜索时，获取要搜索的内容，并添加到数组中和保存到本地；
     */
    OnSearch (q) {
      // 非空判断和去除两侧空白符；
      if (!q.trim()) {
        return
      }
      // 查找已有的数组看是否已存在；
      const index = this.searchHistories.indexOf(q)
      if (index !== -1) {
        // 若存在则删除
        this.searchHistories.splice(index, 1)
      }
      // 把搜索的记录从前面添加到数组中
      this.searchHistories.unshift(q)
      // 保存到本地；
      // 这里务必要手动进行本地储存因为，下面有一个路由，还没等监视到呢，页面已经发生跳转了
      SetStorage('search-histories', this.searchHistories)
      // 动态路由跳转；
      this.$router.push(`/search/${q}`)
    },
    // 联想建议
    async Oninput () {
      // 去除两侧空格并进行非空判断
      if (!this.SearchText.trim()) return
      // 获取联想建议结果
      const { data } = await Search(this.SearchText)
      this.AssociateList = data.data.options
    },
    // 关键字高亮
    highlight (item) {
      const res = new RegExp(this.SearchText, 'gi')
      return item.replace(res, `<span style="color: red">${this.SearchText}</span>`)
    }
  }
}
</script>

<style scoped>

</style>
