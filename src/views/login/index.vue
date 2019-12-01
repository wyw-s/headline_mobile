<template>
  <div>
    <van-nav-bar title="登录"/>
    <van-cell-group>
      <van-field
          v-model="user.mobile"
          label="手机号"
          placeholder="请输入手机号"
      />
      <van-field
          v-model="user.code"
          label="验证码"
          placeholder="请输入验证码"
      />
    </van-cell-group>
    <div class="login">
      <van-button type="info" @click="OnLogin">登录</van-button>
    </div>
  </div>
</template>

<script>
import { login } from '../../api/user.js'
export default {
  name: 'login_index',
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      }
    }
  },
  methods: {
    async OnLogin () {
      /**
       * toast 的动画运行的时候后面的会把前面的动画停止
       * 支持手动清除；this.$toast.clear()
       */
      this.$toast.loading({
        duration: 0, // 展时时长 为0 则不会消失
        message: '加载中...', // 提示信息
        forbidClick: true, // 禁止背景点击
        loadingType: 'spinner' // 样式
      })
      try {
        // 如果响应成功，则后面的代码执行，如果不成功，则后面的代码不执行；
        // 直接进入catch,data为响应回来的直接数据(里面包含所有的响应数据)，名字不可更改
        const { data } = await login(this.user)
        // 登录成功把token保存起来
        this.$store.commit('SetUser', data)
        this.$toast.success('登录成功')
      } catch (error) {
        this.$toast.fail('登录失败,手机号或验证码错误')
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .login {
    padding: 30px 20px;

    .van-button {
      width: 100%;
      border: 0;
      border-radius: 5px;
      background-color: #6db4fb;
    }
  }

</style>
