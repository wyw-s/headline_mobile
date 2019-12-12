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
            :src="User.photo"
        />
      </van-cell>
      <van-cell title="昵称" :value="User.name" is-link />
      <van-cell title="性别" :value="User.gender === 1 ? '女' : '男'" is-link />
      <van-cell title="生日" :value="User.birthday" is-link />
    </van-cell-group>
  </div>
</template>

<script>
import { getUserInfo } from '../../api/user'

export default {
  name: 'UserIndex',
  data () {
    return {
      User: {}
    }
  },
  created () {
    this.loadUser()
  },
  methods: {
    async loadUser () {
      const { data } = await getUserInfo()
      this.User = data.data
      console.log(data)
    }
  }
}
</script>
<style scoped lang='less'>
  .van-nav-bar__title {
    color: #fff;
  }
</style>
