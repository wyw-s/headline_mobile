<template>
  <div>
    <!--子路由出口-->
    <router-view/>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="search">问答</van-tabbar-item>
      <van-tabbar-item icon="friends-o">视频</van-tabbar-item>
      <!--
      路由在切换时。旧组件会被销毁，但是vuex里面的数据不会被销毁；
      所以把用户的登录信息储存到vuex中，可以用做登录时的判断
      -->
      <van-tabbar-item
          icon="setting-o"
          to="/my"
      >{{ $store.state.Token ? '我的' : '未登录' }}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'tabbar_index',
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style scoped>

</style>
