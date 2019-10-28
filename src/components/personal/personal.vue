<template>
  <div class="main">
    <loading v-if="isLoading"></loading>
    <template v-else>
      <div class="scroll-list-wrap">
        <cube-scroll
          ref="scroll"
          :data="photos"
        >
          <div>
            <!--<img v-if="user.photo" @load="imgLoaded" class="banner" :src="user.photo" alt="">-->
            <div class="avatar">
              <img v-if="user.photo" @load="imgLoaded" @click="handleAvatarClick" :src="user.photo" alt="">
              <img v-else :src="defaultAvatar" alt="">
            </div>
            <div class="personal">
              <div class="single border-bottom-1px">
                <label>昵称</label>
                <div class="single-static">{{user.nickName}}</div>
              </div>
              <div class="single border-bottom-1px">
                <label>性别</label>
                <div class="single-static">{{user.gender === 1 ? '男' : '女' }}</div>
              </div>
              <div class="single border-bottom-1px">
                <label>年龄</label>
                <div class="single-static">{{formatAge(user.identityCard)}}</div>
              </div>
              <div class="single border-bottom-1px">
                <label>地区</label>
                <div class="single-static">{{user.city}}</div>
              </div>
              <div class="single border-bottom-1px">
                <label>兴趣</label>
                <div class="single-static">{{user.interest}}</div>
              </div>
              <div v-if="user.userAlbumList.length" class="photos">
                <div class="photos-title">个人相册</div>
                <div class="photos-wrap">
                  <div
                    v-for="(item, index) in photos"
                    :key="item"
                    @click="handleImgsClick(index)"
                    class="imgItem">
                    <img :src="item" alt="">
                  </div>
                </div>
              </div>
            </div>
            <div class="chat">
              <cube-button @click="joinRoom">加入聊天</cube-button>
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
  import {getAge} from 'common/js/util'
  import {UA} from 'common/js/regexp'

  const defaultAvatar = require('common/image/avatar.png')

  export default {
    data() {
      return {
        isLoading: true,
        defaultAvatar,
        user: null,
        photos: [],
        initialIndex: 0
      }
    },
    created() {
      const {roomId, createId} = this.$route.params
      this.roomId = roomId
      this.createId = createId
      this.fetchData()
    },
    methods: {
      async fetchData() {
        let user = await this.getData()
        if (user.userAlbumList.length) {
          this.photos = user.userAlbumList.map(v => {
            return v.photo
          })
        }
        this.user = user
        this.isLoading = false
      },
      getData() {
        return new Promise(resolve => {
          this.$post(api.findUserById, {
            userId: this.createId
          }).then(res => {
            if (res.code === ERR_OK) {
              resolve(res.data)
            }
          })
        })
      },
      imgLoaded() {
        if (!this.checkloaded) {
          this.checkloaded = true
          setTimeout(() => {
            this.$refs.scroll.refresh()
          }, 20)
        }
      },
      handleAvatarClick() {
        this.$createImagePreview({
          imgs: [this.user.photo]
        }).show()
      },
      handleImgsClick(index) {
        this.initialIndex = index
        const params = {
          $props: {
            imgs: this.photos,
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
      },
      formatAge(idCard) {
        return getAge(idCard)
      },
      // 加入聊天
      joinRoom() {
        if (UA().isIOS) { // ios
          /* eslint-disable no-undef */
          OCModel.joinRoom(this.roomId)
        } else { // android
          window.android.joinRoom(this.roomId)
        }
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
    .avatar
      text-align: center
      padding: 20px 0 10px
      img
        width: 100px
        height: 100px
        border-radius: 50%
    .personal
      padding: 10px 15px
      .photos
        .photos-title
          height: 50px
          line-height: 50px
          color: #999
          font-size: 16px
        .photos-wrap
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
      padding: 20px 0 40px
      width: 180px
      margin: 0 auto
</style>
