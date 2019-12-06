<template>
  <div>
    <van-nav-bar
        title="标题"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
    >
      <!--<span >-->
        <van-icon slot="left" name="arrow-left" />
      <!--</span>-->
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: 'search_index',
  methods: {
    onClickLeft () {
    },
    onClickRight () {
    }
  }
}
</script>

<style scoped>

</style>
