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
    <van-cell-group :border="false">
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
    <van-cell-group>
      <van-cell title="历史记录" value="内容"  :border="false">
        <span>全部删除</span>&nbsp;&nbsp;
        <span>完成</span>
        <van-icon name="delete" />
      </van-cell>
      <van-cell title="单元格" value="内容">
        <van-icon name="delete" />
      </van-cell>
      <van-cell title="单元格" value="内容">
        <van-icon name="delete" />
      </van-cell>
      <van-cell title="单元格" value="内容">
        <van-icon name="delete" />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { Search } from '../../api/search.js'
export default {
  name: 'search-index',
  data: function () {
    return {
      SearchText: '', // 搜索关键字
      AssociateList: [] // 联想建议列表
    }
  },
  methods: {
    OnSearch (q) {
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
