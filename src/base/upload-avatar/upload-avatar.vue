<template>
  <div class="child-wrap">
    <cube-upload
      ref="upload"
      v-model="imgurl"
      :action="action"
      :max="1"
      :multiple="multiple"
      :simultaneous-uploads="1"
      :process-file="processFile"
      @file-submitted="fileSubmitted"
      @files-added="filesAdded"
      @file-success="filesSuccess"
      @file-error="fileError"
      @file-removed="fileREmoved">
      <div class="clear-fix">
        <cube-upload-file v-for="(file, i) in imgurl" :file="file" :key="i"></cube-upload-file>
        <cube-upload-btn :multiple="false">
          <div>
            <img :src="defaultAvatar"/>
          </div>
        </cube-upload-btn>
      </div>
    </cube-upload>
  </div>
</template>

<script type="text/ecmascript-6">
  import Config from 'common/js/config'
  import api from 'common/js/api'
  import compress from '../../modules/image'

  const defaultAvatar = require('common/image/avatar.png')

  export default {
    props: {
      multiple: {
        type: Boolean,
        default: false
      },
      getimgurl: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    data() {
      return {
        imgurl: [],
        action: {
          target: Config.ApiHost + api.uploadBase64File,
          prop: 'base64Value',
          fileName: 'data',
          data: {
            fileName: ''
          }
        },
        defaultAvatar
      }
    },
    created() {
      if (this.getimgurl.length) {
        this.imgurl = this.getimgurl
        let arr = []
        this.imgurl.forEach(item => {
          arr.push(item.url)
        })
        this.imgurls = arr
      }
      this.uploadFlag = false
      this.fileGroup = []
    },
    methods: {
      processFile(file, next) {
        compress(file, {
          compress: {
            width: 1600,
            height: 1600,
            quality: 0.5
          }
        }, next)
      },
      fileSubmitted(file) {
        console.log('fileSubmitted', file)
        let base64Value = file.file.base64.split(';base64,')[1]
        file.base64Value = base64Value
        this.action.data.fileName = file.name
      },
      filesAdded(files) {
        this.uploadFlag = false
        if (this.fileGroup.length) {
          this.fileGroup.forEach((item) => {
            item.removeEventListener('click', this.eventHandle, false)
          })
        }
        let hasIgnore = false
        const maxSize = 6 * 1024 * 1024 // 6M
        for (let k in files) {
          const file = files[k]
          if (file.size > maxSize) {
            file.ignore = true
            hasIgnore = true
          }
        }
        hasIgnore && this.$createToast({
          type: 'warn',
          time: 1000,
          txt: '上传图片大小不能超过 6M!'
        }).show()
        const file = this.imgurl[0]
        file && this.$refs.upload.removeFile(file)
      },
      filesSuccess() {
        let arr = []
        this.imgurl.forEach((item) => {
          if (item.response) {
            arr.push(item.response.data)
          }
        })
        this.imgurls = arr
        this.$emit('uploadimg', this.imgurls)
        this.previewImg()
      },
      eventHandle() {
        this.$createImagePreview({
          imgs: this.imgurls,
          initialIndex: 0
        }).show()
      },
      fileError(file) {
        console.log(file)
      },
      fileREmoved(file) {
        if (file.response) {
          let url = file.response.data
          this.imgurls.forEach((item, index) => {
            if (item === url) {
              this.imgurls.splice(index, 1)
              this.$emit('deleteimg', this.imgurls)
            }
          })
        } else if (file.url) { // 已有头像传入修改
          let url = file.url
          this.imgurls.forEach((item, index) => {
            if (item === url) {
              this.imgurls.splice(index, 1)
              this.$emit('deleteimg', this.imgurls)
            }
          })
        }
      },
      previewImg() {
        if (!this.uploadFlag) {
          this.uploadFlag = true
          this.fileGroup = document.querySelectorAll('.cube-upload-file-state')
          this.fileGroup.forEach((item) => {
            item.addEventListener('click', this.eventHandle, false)
          })
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~stylus/mixin"

  $width = 100px
  $top = -100px
  .cube-upload
    .cube-upload-file, .cube-upload-btn
      margin: 0 auto
      width: $width
      height: $width
    .cube-upload-file
      margin: 0 auto
      border-radius: 50%
      /*.cube-upload-file-state*/
      + .cube-upload-btn
        margin-top: $top
        opacity: 0
    /deep/ .cube-upload-file-def
      width: 100%
      height: 100%
      border-radius: 50%
      .cubeic-wrong
        display: none
    .cube-upload-btn
      display: flex
      align-items: center
      justify-content: center
      > div
        height: 40px
        position: relative
      img
        width: 40px
        height: 40px
        border-radius: 50%
</style>
