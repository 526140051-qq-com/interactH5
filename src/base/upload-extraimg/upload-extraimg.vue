<template>
  <cube-upload
    ref="upload"
    v-model="imgurl"
    :action="action"
    :max="9"
    :simultaneous-uploads="1"
    :process-file="processFile"
    @file-submitted="fileSubmitted"
    @files-added="filesAdded"
    @file-success="filesSuccess"
    @file-error="fileError"
    @file-removed="fileREmoved"/>
</template>

<script type="text/ecmascript-6">
  import Config from 'common/js/config'
  import api from 'common/js/api'
  import compress from '../../modules/image'
  import {getToken} from 'common/js/cache'

  export default {
    props: {
      getImgUrl: {
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
          },
          headers: {
            'token': getToken()
          }
        },
        fileGroup: []
      }
    },
    created() {
      if (this.getImgUrl.length) {
        this.imgurl = this.getImgUrl
        let arr = []
        this.imgurl.forEach(item => {
          arr.push(item.url)
        })
        this.imgurls = arr
        this.$nextTick(() => {
          this.previewImg()
        })
      } else {
        this.imgurls = []
      }
      this.uploadFlag = false
      this.fileGroup = []
    },
    methods: {
      processFile(file, next) {
        let quality = file.size < 1000 * 1024 ? 0.8 : 0.6
        // 100kb内图片不压缩
        if (file.size < 100 * 1024) {
          compress(file, {
            compress: false
          }, next)
        } else {
          compress(file, {
            compress: {
              width: 1600,
              height: 1600,
              quality
            }
          }, next)
        }
      },
      fileSubmitted(file) {
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
      },
      filesSuccess() {
        let arr = []
        this.imgurl.forEach((item) => {
          if (item.response) {
            arr.push(item.response.data)
          }
        })
        let imgurls = this.imgurls.concat(arr)
        this.imgurls = Array.from(new Set(imgurls))
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
        } else {
          if (this.imgurls.length) {
            this.imgurls.forEach((item, index) => {
              if (item === file.url) {
                this.imgurls.splice(index, 1)
                this.$emit('deleteimg', this.imgurls)
              }
            })
          }
        }
      },
      previewImg() {
        if (!this.uploadFlag) {
          this.uploadFlag = true
          this.fileGroup = document.querySelectorAll('.cube-upload-file-state')
          this.fileGroup = [].slice.call(this.fileGroup)
          this.fileGroup.forEach((item) => {
            item.addEventListener('click', this.eventHandle, false)
          })
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
