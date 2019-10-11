<template>
  <div class="main">
    <loading v-if="isLoading"></loading>
    <template v-else>
      <div class="scroll-list-wrap">
        <cube-scroll>
          <div>
            <div class="avatar">
              <img :src="avatar" alt="">
            </div>
            <div class="personal">
              <div class="box border-bottom-1px">
                <div class="lbl">昵称</div>
                <div class="content">用户12345</div>
              </div>
              <div class="box border-bottom-1px">
                <div class="lbl">性别</div>
                <div class="content">女</div>
              </div>
              <div class="box border-bottom-1px">
                <div class="lbl">年龄</div>
                <div class="content">23</div>
              </div>
              <div class="box border-bottom-1px">
                <div class="lbl">手机号</div>
                <div class="content">13862428332</div>
              </div>
              <div class="box border-bottom-1px">
                <div class="lbl">身份证</div>
                <div class="content">320586198906076115</div>
              </div>
              <div class="box border-bottom-1px">
                <div class="lbl">地区</div>
                <div class="content">苏州</div>
              </div>
              <div class="box border-bottom-1px">
                <div class="lbl">兴趣</div>
                <div class="content">一起玩啊</div>
              </div>
            </div>
          </div>
        </cube-scroll>
      </div>
    </template>
  </div>
</template>

<script type="text/ecmascript-6">
  import Loading from 'base/loading/loading'
  import api from 'common/js/api'
  import {ERR_OK} from 'common/js/config'

  export default {
    data() {
      return {
        isLoading: true,
        avatar: 'http://youeryuanapp.oss-cn-shanghai.aliyuncs.com/static/school/t1.png'
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      async fetchData() {
        let ret = await this.getData()
        this.ret = ret
        this.isLoading = false
      },
      getData() {

      }
    },
    components: {
      Loading
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~stylus/mixin"

  .scroll-list-wrap
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    overflow: hidden
    .avatar
      text-align: center
      padding: 20px 0 10px
      img
        width: 80px
        height: 80px
        border-radius: 50%
    .personal
      padding: 10px 15px
      .box
        display: flex
        align-items: center
        height: 44px
        font-size: 15px
        .lbl
          width: 70px
          flex: 0 0 70px
          color: $gray
        .content
          flex: 1
          color: $dark
          clamp(1)

</style>
