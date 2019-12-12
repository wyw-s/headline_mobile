<template>
  <div>
    <van-nav-bar
        title="个人信息"
        left-arrow
        right-text="保存"
        @click-right="onSave"
    />
    <van-cell-group>
      <van-cell title="头像" is-link @click="onChangePhoto">
        <van-image
            round
            width="30"
            height="30"
            :src="User.photo"
        />
      </van-cell>
      <van-cell title="昵称" :value="User.name" is-link/>
      <van-cell title="性别" :value="User.gender === 1 ? '女' : '男'" is-link/>
      <van-cell title="生日" :value="User.birthday" is-link/>
    </van-cell-group>
    <input
        type="file"
        hidden
        @change="onFileChange"
        ref="file"
    >
  </div>
</template>

<script>
import { getUserInfo, updateUserPhoto } from '../../api/user'

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
    },
    // 点击头像
    onChangePhoto () {
      this.$refs.file.click()
    },
    onFileChange () {
      this.User.photo = window.URL.createObjectURL(this.$refs.file.files[0])
    },
    // 提交头像修改；
    async onSave () {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message: '保存中'
      })
      try {
        const formData = new FormData()
        formData.append('photo', this.$refs.file.files[0])
        await updateUserPhoto(formData)
        this.$toast.success('保存成功')
      } catch (e) {
        this.$toast.success('保存失败')
      }
    }
  }
}
</script>
<style scoped lang='less'>
  .van-nav-bar__left {
    .van-icon-arrow-left {
      color: #fff;
    }
  }

  .van-nav-bar__title {
    color: #fff;
  }

  .van-nav-bar__right {
    .van-nav-bar__text {
      color: #fff;
    }
  }
</style>
