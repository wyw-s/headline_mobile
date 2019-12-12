<template>
  <div>
    <van-nav-bar
        title="个人信息"
        left-arrow
        right-text="保存"
    />
    <van-cell-group>
      <van-cell title="头像" is-link>
        <van-image
            round
            width="30"
            height="30"
            src="http://toutiao.meiduo.site/FgSTA3msGyxp5-Oufnm5c0kjVgW7"
        />
      </van-cell>
      <van-cell title="昵称" value="abc" is-link />
      <van-cell title="性别" value="男" is-link />
      <van-cell title="生日" value="2019-9-27" is-link />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'UserIndex'
}
</script>
<style scoped lang='less'>
  .van-nav-bar__title {
    color: #fff;
  }
</style>
