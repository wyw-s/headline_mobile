<template>
  <div>
    <!--搜索框-->
    <form action="/">
      <van-search
          v-model="SearchText"
          placeholder="请输入搜索关键词"
          show-action
          shape="round"
          @search="OnSearch"
          @input="Oninput"
      >
        <div slot="action" @click="OnSearch">搜索</div>
      </van-search>
    </form>
    <!--联想建议-->
    <van-cell-group :border="false">
      <van-cell
          v-for="item in AssociateList"
          :key="item"
          :title="item"
          icon="search"
      />
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
      SearchText: '',
      AssociateList: []
    }
  },
  methods: {
    OnSearch (e) {
    },
    async Oninput () {
      // 去除两侧空格并进行非空判断
      if (!this.SearchText.trim()) return
      const { data } = await Search(this.SearchText)
      this.AssociateList = data.data.options
    }
  }
}
</script>

<style scoped>

</style>
