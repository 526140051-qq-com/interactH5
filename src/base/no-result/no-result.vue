<template>
  <div class="no-result">
    <div class="no-result-icon"></div>
    <p class="no-result-text">{{title}}</p>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: '抱歉，暂无数据'
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~stylus/mixin"

  .no-result
    text-align: center
    .no-result-icon
      margin: 0 auto
      bg-image('no-result', 81px, 64px)
    .no-result-text
      margin-top: 20px
</style>
