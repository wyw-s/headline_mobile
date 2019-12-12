<template>
  <div>
    <!-- 未登录 -->
    <!--
    未登录则显示登录，否则隐藏登录，显示用户信息
    -->
    <div class="not-login" v-if="!$store.state.Token">
      <div class="circle" @click="$router.push({ name: 'login' })">
        <span>登录</span>
      </div>
    </div>
    <!-- /未登录 -->

    <!-- 用户信息 -->
    <van-cell-group class="user-info" v-else>
      <van-cell
          class="base-info"
          is-link :border="false"
          @click="$router.push('/user')"
      >
        <div slot="title">
          <img class="avatar" :src="user.photo" alt="">
          <span class="title">{{ user.name }}</span>
        </div>
      </van-cell>
      <van-grid class="data-info" :border="false">
        <van-grid-item>
          <span class="count">{{ user.art_count }}</span>
          <span class="text">头条</span>
        </van-grid-item>
        <van-grid-item>
          <span class="count">{{ user.follow_count }}</span>
          <span class="text">关注</span>
        </van-grid-item>
        <van-grid-item>
          <span class="count">{{ user.fans_count }}</span>
          <span class="text">粉丝</span>
        </van-grid-item>
        <van-grid-item>
          <span class="count">{{ user.like_count }}</span>
          <span class="text">获赞</span>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <!-- /用户信息 -->

    <!-- 其它 -->
    <van-cell-group>
      <van-grid clickable>
        <van-grid-item icon="star" text="我的收藏"/>
        <van-grid-item icon="chat" text="我的评论"/>
        <van-grid-item icon="like" text="我的点赞"/>
        <van-grid-item icon="browsing-history" text="浏览历史"/>
      </van-grid>
    </van-cell-group>
    <van-cell-group>
      <van-cell title="消息通知" is-link />
      <van-cell title="用户反馈" is-link />
      <van-cell title="小智同学" is-link @click="$router.push('/chat')" />
      <van-cell title="系统设置" is-link to="/settings" />
    </van-cell-group>
    <!-- /其它 -->
    <van-cell title="退出登录" @click="onLogout" />
  </div>
</template>

<script>
import { getSelf } from '../../api/user'

export default {
  name: 'UserIndex',
  data () {
    return {
      user: {} // 用户信息对象
    }
  },
  created () {
    // 如果用户登录了才展示用户信息
    if (this.$store.state.Token) {
      this.loadUser()
    }
  },
  methods: {
    async loadUser () {
      const { data } = await getSelf()
      this.user = data.data
    },
    // 点击退出
    onLogout () {
      this.$dialog.confirm({
        title: '退出提示',
        message: '确认退出吗'
      }).then(() => {
        // 同删除本地和vuex里面的的用户信息
        // 若代码在vuex里运行错误则不会显示报错信息；
        // 此刻后面的代码也不会执行；
        this.$store.commit('SetUser', null)
      }).catch(() => {
        // on cancel
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .not-login {
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    .circle {
      width: 50px;
      height: 50px;
      padding: 20px;
      background-color: red;
      border-radius: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-size: 20px;
    }
  }

  .user-info {
    .base-info {
      display: flex;
      align-items: center;
      div {
        display: flex;
        align-items: center
      }
      .avatar {
        margin-right: 15px;
        width: 50px;
        height: 50px;
        border-radius: 100%;
      }
    }
    .data-info {
      .text {
        font-size: 14px;
      }
      .count {
        font-size: 12px;
      }
    }
  }
</style>
