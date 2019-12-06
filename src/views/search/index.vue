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
      >
        <div slot="action" @click="OnSearch">搜索</div>
      </van-search>
    </form>
    <!--联想建议-->
    <van-cell-group :border="false">
      <van-cell title="单元格" icon="search"/>
      <van-cell title="单元格" icon="search"/>
      <van-cell title="单元格" icon="search"/>
      <van-cell title="单元格" icon="search"/>
      <van-cell title="单元格" icon="search"/>
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
export default {
  name: 'search-index',
  data: function () {
    return {
      SearchText: ''
    }
  },
  methods: {
    OnSearch (e) {
      console.log(234)
      console.log(e)
    }
  }
}
</script>

<style scoped>

</style>
