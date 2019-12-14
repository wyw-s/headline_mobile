<template>
  <div class="chat-container">
    <!-- 导航栏 -->
    <van-nav-bar
        title="小智同学"
        left-arrow
        class="left_arrow"
        @click-left="$router.back()"
        fixed
    />
    <!-- /导航栏 -->

    <!-- 消息列表 -->
    <div class="message-list" ref="message-list">
      <div
          class="message-item"
          :class="{ reverse: item.isMe }"
          v-for="item in messages"
          :key="item.timestamp"
      >
        <van-image
            class="avatar"
            slot="icon"
            round
            width="30"
            height="30"
            :src="item.photo"
        />
        <div class="title">
          <span>{{ item.msg }}</span>
        </div>
      </div>
    </div>
    <!-- /消息列表 -->

    <!-- 发送消息 -->
    <van-cell-group class="send-message">
      <van-field
          v-model="message"
          center
          clearable
      >
        <van-button
            slot="button"
            size="small"
            type="primary"
            @click="OnSend"
        >发送
        </van-button>
      </van-field>
    </van-cell-group>
    <!-- /发送消息 -->
  </div>
</template>

<script>
import io from 'socket.io-client'
import { SetStorage, GetStorage } from '../../utils/storage.js'

export default {
  name: 'socket',
  data () {
    return {
      message: '',
      socket: null,
      messages: GetStorage('message') || [] // 存储所有的消息列表
    }
  },
  watch: {
    messages: function () {
      SetStorage('message', this.messages)
      const messageList = this.$refs['message-list']
      this.$nextTick(() => {
        messageList.scrollTop = messageList.scrollHeight
      })
    }
  },
  mounted () {
    const messageList = this.$refs['message-list']
    messageList.scrollTop = messageList.scrollHeight
  },
  created () {
    const socke = io('http://ttapi.research.itcast.cn')
    this.socket = socke
    // 当客户端与服务器建立连接成功，触发事件
    this.socket.on('message', (data) => {
      data.photo = 'https://cdn4.buysellads.net/uu/1/3386/1525189943-38523.png'
      this.messages.push(data)
    })
    // 收到消息成功把消息储存到数组中；
  },
  methods: {
    OnSend () {
      // 非空效验及去除两侧空白符；
      if (!this.message.trim()) return
      const data = {
        msg: this.message,
        timestamp: Date.now()
      }
      data.isMe = true
      data.photo = 'http://toutiao.meiduo.site/FtXKVGDCm5jDpLWHpi7ob-M6h_LN'
      this.socket.emit('message', data)
      // 发送成功把消息储存到数组中；
      this.messages.push(data)
      // 清空文本框；
      this.message = ''
    }
  }
}
</script>

<style scoped lang='less'>
  .chat-container {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 46px 0 50px 0;
    top: 0;
    left: 0;
    box-sizing: border-box;
    background: #f5f5f6;

    .left_arrow {
      .van-icon {
        color: #fff;
      }

      .van-nav-bar__title {
        color: #fff;
      }
    }

    .message-list {
      height: 100%;
      overflow-y: scroll;

      .message-item {
        display: flex;
        align-items: center;
        padding: 10px;

        .title {
          background: #fff;
          padding: 5px;
          border-radius: 6px;
        }

        .avatar {
          margin-right: 5px;
        }
      }

      .reverse {
        flex-direction: row-reverse;

        .title {
          margin-right: 5px;
        }
      }
    }

    .send-message {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: #f5f5f6 !important;
    }
  }
</style>
