<template>
  <div class="main">
    <loading v-if="isLoading"></loading>
    <template v-else>
      <div class="scroll-list-wrap">
        <cube-scroll
          ref="scroll"
          :data="imgUrls">
          <div>
            <div class="avatar">
              <upload-avatar
                :getimgurl="imgAvatar"
                @uploadimg="imgUploadHandler"
              >
              </upload-avatar>
            </div>
            <div class="personal">
              <div class="single border-bottom-1px">
                <label>昵称</label>
                <div class="single-control">
                  <cube-input v-model.trim="user.nickName" placeholder="请输入昵称" clearable></cube-input>
                </div>
              </div>
              <div class="border-bottom-1px">
                <picker
                  :data="sexOptions"
                  :title="sexTitle"
                  :text="sexText"
                  :selectedIndex="selectedIndex"
                  @select="selectSexHandler"
                ></picker>
              </div>
              <div class="single border-bottom-1px">
                <label>年龄</label>
                <div class="single-static">{{formatAge(user.identityCard)}}</div>
              </div>
              <div class="single border-bottom-1px">
                <label>手机号</label>
                <div class="single-static">{{user.phone}}</div>
              </div>
              <div class="single border-bottom-1px">
                <label>身份证</label>
                <div class="single-control">
                  <cube-input v-model.trim="user.identityCard" placeholder="请输入身份证" clearable></cube-input>
                </div>
              </div>
              <div class="border-bottom-1px">
                <city-picker
                  :title="cityTitle"
                  :text="cityText"
                  :selectedIndex="selectedCityIndex"
                  @select="selectCityHandler"
                ></city-picker>
              </div>
              <div class="single border-bottom-1px">
                <label>兴趣</label>
                <div class="single-control">
                  <cube-input v-model.trim="user.interest" placeholder="请输入兴趣爱好" clearable></cube-input>
                </div>
              </div>
              <div class="photos">
                <div class="photos-title">上传更多照片</div>
                <div class="photos-wrap">
                  <upload-extraimg
                    :getImgUrl="imgUrls"
                    @uploadimg="imgsUploadHandler"
                    @deleteimg="imgsDeleteHandler"
                  >
                  </upload-extraimg>
                </div>
              </div>
            </div>
            <div class="submit">
              <cube-button @click="onSubmit">{{btnTxt}}</cube-button>
            </div>
          </div>
        </cube-scroll>
      </div>
    </template>
  </div>
</template>

<script type="text/ecmascript-6">
  import Loading from 'base/loading/loading'
  import Picker from 'base/picker/picker'
  import CityPicker from 'base/city-picker/city-picker'
  import UploadAvatar from 'base/upload-avatar/upload-avatar'
  import UploadExtraimg from 'base/upload-extraimg/upload-extraimg'
  import api from 'common/js/api'
  import {PICKER_TEXT, ERR_OK} from 'common/js/config'
  import {getAge} from 'common/js/util'

  const defaultAvatar = require('common/image/avatar.png')

  export default {
    data() {
      return {
        isLoading: true,
        user: null,
        defaultAvatar,
        imgAvatar: [],
        imgUrls: [],
        sexOptions: [
          {
            id: 1,
            name: '男'
          },
          {
            id: 2,
            name: '女'
          }
        ],
        sexTitle: '性别',
        sexText: PICKER_TEXT,
        selectedIndex: 0,
        cityTitle: '地区',
        cityText: PICKER_TEXT,
        selectedCityIndex: [0, 0],
        btnTxt: '保存',
        clickMore: true
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      async fetchData() {
        const user = await this.getData()
        const {gender, city, cityIndex, userAlbumList} = user
        if (user.photo) {
          this.imgAvatar.push({url: user.photo})
        } else {
          this.imgAvatar.push({url: defaultAvatar})
        }
        if (userAlbumList.length) {
          userAlbumList.forEach(v => {
            this.imgUrls.push({url: v.photo})
          })
        }
        this.user = user
        this.sexText = gender === 1 ? '男' : '女'
        this.selectedIndex = gender - 1
        if (city) this.cityText = city
        if (cityIndex) this.selectedCityIndex = cityIndex.split(',')
        this.isLoading = false
      },
      getData() {
        return new Promise(resolve => {
          this.$post(api.findUserById).then(res => {
            if (res.code === ERR_OK) {
              resolve(res.data)
            }
          })
        })
      },
      imgUploadHandler(imgAvatar) {
        this.user.photo = imgAvatar[0]
      },
      imgsUploadHandler(imgUrls) {
        this.imgUrls = []
        if (imgUrls.length) {
          imgUrls.forEach(v => {
            this.imgUrls.push({url: v})
          })
        }
        this.user.photos = imgUrls.join(',')
      },
      imgsDeleteHandler(imgUrls) {
        this.imgUrls = []
        if (imgUrls.length) {
          imgUrls.forEach(v => {
            this.imgUrls.push({url: v})
          })
        }
        this.user.photos = imgUrls.join(',')
      },
      formatAge(idCard) {
        if (!idCard) return ''
        return getAge(idCard)
      },
      selectSexHandler(val, text) {
        this.sexText = text
        this.user.gender = val
      },
      selectCityHandler(text, index) {
        this.cityText = text[1]
        this.user.city = text[1]
        this.selectedCityIndex = index
      },
      // 保存编辑
      onSubmit() {
        if (!this.user.nickName) {
          this.$toast('请输入昵称')
          return
        }
        if (this.clickMore) {
          this.clickMore = false
          this.btnTxt = '提交中...'
          this.updateUserInfo().then(() => {
            this.$toast('编辑成功')
            this.clickMore = true
            this.btnTxt = '保存'
          })
        }
      },
      updateUserInfo() {
        return new Promise(resolve => {
          const {photo, nickName, gender, identityCard, city, interest, photos} = this.user
          this.$post(api.updateUserInfo, {
            photo,
            nickName,
            gender,
            idCard: identityCard,
            city,
            cityIndex: this.selectedCityIndex.join(','),
            interest,
            photos
          }).then(res => {
            if (res.code === ERR_OK) {
              resolve()
            }
          })
        })
      }
    },
    components: {
      Loading,
      Picker,
      CityPicker,
      UploadAvatar,
      UploadExtraimg
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~stylus/mixin"

  $width = 100px
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
        width: $width
        height: $width
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
          padding-top: 5px
    .submit
      padding: 30px 15px
</style>
