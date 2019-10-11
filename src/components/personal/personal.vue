<template>
  <div class="main">
    <loading v-if="isLoading"></loading>
    <template v-else>
      <div class="scroll-list-wrap">
        <cube-scroll
          :data="photo"
        >
          <div>
            <img class="banner" :src="photo[0]" alt="">
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
                <div class="lbl">地区</div>
                <div class="content">苏州</div>
              </div>
              <div class="box border-bottom-1px">
                <div class="lbl">兴趣</div>
                <div class="content">一起玩啊</div>
              </div>
            </div>
            <div class="photo">
              <div
                v-for="(item, index) in photo"
                :key="item"
                @click="handleImgsClick(index)"
                class="imgItem">
                <img :src="item" alt="">
              </div>
            </div>
            <div class="chat">
              <cube-button class="small">加入聊天111</cube-button>
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
        user: null,
        initialIndex: 0,
        photo: [
          'http://youeryuanapp.oss-cn-shanghai.aliyuncs.com/static/school/t1.png',
          'http://youeryuanapp.oss-cn-shanghai.aliyuncs.com/static/school/t2.png',
          'http://youeryuanapp.oss-cn-shanghai.aliyuncs.com/static/school/t3.png',
          'http://youeryuanapp.oss-cn-shanghai.aliyuncs.com/static/school/t4.png',
          'http://youeryuanapp.oss-cn-shanghai.aliyuncs.com/static/school/t5.png',
          'http://youeryuanapp.oss-cn-shanghai.aliyuncs.com/static/school/t6.png',
          'http://youeryuanapp.oss-cn-shanghai.aliyuncs.com/static/school/t7.png',
          'http://youeryuanapp.oss-cn-shanghai.aliyuncs.com/static/school/t8.png',
          'http://youeryuanapp.oss-cn-shanghai.aliyuncs.com/static/school/t9.png',
          'http://youeryuanapp.oss-cn-shanghai.aliyuncs.com/static/school/t10.png',
        ]
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      async fetchData() {
        let user = await this.getData()
        this.user = user
        this.isLoading = false
      },
      getData() {
        return new Promise(resolve => {
          this.$post(api.findUserById, {userId: 1}).then(res => {
            if (res.code === ERR_OK) {
              resolve(res.data)
            }
          })
        })
      },
      handleImgsClick(index) {
        this.initialIndex = index
        const params = {
          $props: {
            imgs: this.photo,
            initialIndex: 'initialIndex', // 响应式数据的key名
            loop: false
          },
          $events: {
            change: (i) => {
              // 必须更新 initialIndex
              this.initialIndex = i
            }
          }
        }
        this.$createImagePreview({...params}).show()
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
    .banner
      width: 100%
      height: 180px
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

    .photo
      padding: 10px 15px 0
      display: flex
      flex-wrap: wrap
      margin: 0 0 0 -5px
      .imgItem
        margin: 5px 0 0 5px
        width: calc((100% - 15px) / 3)
        img
          display: block
          width: 100%
          border-radius: 5px

    .chat
      padding: 30px 0
      width: 170px
      margin: 0 auto
</style>
