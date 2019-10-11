<template>
  <div class="loading-container">
    <div class="loading-box">
      <div class="img">
        <cube-loading :size="24"></cube-loading>
      </div>
      <div class="title">{{title}}</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: ''
      }
    },
    data() {
      return {}
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~stylus/variable"

  .loading-container
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: $color-white
    z-index: 10000
    .loading-box
      position: absolute
      top: -80px
      left: 0
      right: 0
      bottom: 0
      margin: auto
      width: 90px
      height: 90px
      text-align: center
      .img
        width: 24px
        margin: 20px auto 9px
      .title
        color: $color-grey
        font-size: 13px
</style>
