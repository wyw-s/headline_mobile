<template>
  <div>
    <van-nav-bar
        title="个人信息"
        left-arrow
        right-text="保存"
        @click-right="onSave"
        @click-left="$router.push('/my')"
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
      <van-cell
          title="昵称"
          :value="User.name"
          is-link
          @click="isEditNameShow = true"
      />
      <van-cell
          title="性别"
          :value="User.gender === 1 ? '女' : '男'"
          is-link
          @click="isEditGenderShow = true"
      />
      <van-cell
          title="生日"
          :value="User.birthday"
          is-link
          @click="isEditBirthdayShow = true"
      />
    </van-cell-group>
    <!-- 隐藏域 -->
    <input
        type="file"
        hidden
        @change="onFileChange"
        ref="file"
    >
    <!-- 编辑昵称弹窗 -->
    <van-dialog
        v-model="isEditNameShow"
        title="昵称修改"
        show-cancel-button
        @confirm="onUserNameConfirm"
    >
      <!--此处不能用v-moudel双向绑定因为用户还没确定呢，数据就已经改了-->
      <van-field
          label="昵称"
          :value="User.name"
          placeholder="请输入昵称"
          @input="onUserNameInput"
      />
    </van-dialog>

    <!-- 编辑用户昵称上拉菜单 -->
    <van-action-sheet
        v-model="isEditGenderShow"
        :actions="actions"
        cancel-text="取消"
        @select="onSelect"
    />
    <!-- /编辑用户昵称上拉菜单 -->
    <!--修改日期-->
    <van-popup
        v-model="isEditBirthdayShow"
        position="bottom"
        :style="{ height: '30%' }"
    >
      <van-datetime-picker
          type="date"
          @confirm="onUserBirthdayConfirm"
          @cancel="isEditBirthdayShow = false"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserInfo, updateUserPhoto, EdilUserInfo } from '../../api/user'
import dayjs from 'dayjs'

export default {
  name: 'UserIndex',
  data () {
    return {
      User: {},
      isEditNameShow: false,
      UserNickname: '', // 用户昵称
      isEditGenderShow: false,
      actions: [
        // 上拉菜单的数据
        // name 会当作文本输出渲染
        // value 是我自己自定义添加的
        { name: '男', value: 0 },
        { name: '女', value: 1 }
      ],
      currentDate: new Date(),
      isEditBirthdayShow: false
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
        // 如果用户选择了头像就更新头像，否则更新用户其他信息；
        if (this.$refs.file.files[0]) {
          const formData = new FormData()
          formData.append('photo', this.$refs.file.files[0])
          await updateUserPhoto(formData)
        }
        await EdilUserInfo({
          name: this.User.name,
          gender: this.User.gender,
          birthday: this.User.birthday
        })
        this.$toast.success('保存成功')
      } catch (e) {
        this.$toast.success('保存失败')
      }
    },
    // 修改昵称
    onUserNameInput (value) {
      this.UserNickname = value
    },
    onUserNameConfirm () {
      this.User.name = this.UserNickname
    },
    // 修改性别
    onSelect (obj) {
      this.isEditGenderShow = false
      this.User.gender = obj.value
      this.$toast('cancel')
    },
    // 日期修改；
    onUserBirthdayConfirm (value) {
      // 更新数据
      this.User.birthday = dayjs(value).format('YYYY-MM-DD')
      // 关闭弹层；
      this.isEditBirthdayShow = false
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
