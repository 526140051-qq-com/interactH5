<template>
  <div class="error">
    <div class="error-wrap">
      <div class="network"></div>
      <div class="title">网络错误，请检查网络后重试</div>
      <div @click="reload" class="reload">重新加载</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getPath} from 'common/js/cache'

  export default {
    data() {
      return {}
    },
    methods: {
      reload() {
        window.location.href = getPath()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~stylus/mixin"

  .error
    display: flex
    justify-content: center
    align-items: center
    min-height: 100vh
    .error-wrap
      transform: translateY(-50%)
      text-align: center
      .network
        bg-image('./network', 87px, 85px)
        margin: 0 auto
      .title
        margin: 20px 0
        font-size: 13px
        color: #9B9B9B
      .reload
        display: flex
        justify-content: center
        align-items: center
        width: 100px
        height: 32px
        text-align: center
        background: #fff
        border-radius: 16px
        font-size: 13px
        margin: 0 auto
        color: #333
        border: 1px solid #4C83FC
</style>
