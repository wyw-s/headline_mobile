<template>
  <div>
    <keep-alive exclude="ArticleIndex">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less" scoped>
</style>
