<template>
  <div class="main">
    <loading v-if="isLoading"></loading>
    <template v-else>
      <div class="wrapper">
        <div
          v-for="(item, index) in list"
          :key="item.id"
          @click="handler(item.id)"
          class="box">
          <div class="box-l">
            <div class="icon" :class="`icon${index + 1}`"></div>
            <div class="title">{{item.name}}</div>
            <div class="time">{{item.days}}</div>
          </div>
          <div class="box-r">
            <div class="price">¥{{item.price}}</div>
            <div class="more"></div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script type="text/ecmascript-6">
  import Loading from 'base/loading/loading'
  import api from 'common/js/api'
  import {ERR_OK} from 'common/js/config'
  import {UA} from 'common/js/regexp'

  export default {
    data() {
      return {
        isLoading: true,
        list: []
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      async fetchData() {
        const list = await this.getData()
        list.forEach(v => {
          if (v.days === 1) {
            v.days = '24小时有效'
          } else if (v.days === 365) {
            v.days = '1年有效'
          } else {
            v.days = v.days + '天有效'
          }
        })
        this.list = list
        this.isLoading = false
      },
      getData() {
        return new Promise(resolve => {
          this.$post(api.findCharge, {state: 1}).then(res => {
            if (res.code === ERR_OK) {
              resolve(res.data)
            }
          })
        })
      },
      handler(id) {
        if (!UA().isAndroid) {
          console.log(id)
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

  .main
    background: #f0f2f5
    min-height: 100vh
    .wrapper
      padding: 20px 15px
      .box
        display: flex
        justify-content: space-between
        align-items: center
        background: #fff
        height: 58px
        border-radius: 10px
        border: $border 1px solid
        padding: 0 10px
        margin-bottom: 20px
        .box-l
          display: flex
          align-items: center
          .icon
            bg-image('./t1', 16px, 16px)
            &.icon2
              bg-image('./t2', 16px, 16px)
            &.icon3
              bg-image('./t3', 16px, 16px)
            &.icon4
              bg-image('./t4', 16px, 16px)
          .title
            font-size: 16px
            margin: 0 10px
            color: #000
          .time
            font-size: 13px
            color: #bbb
        .box-r
          display: flex
          align-items: center
          .price
            color: $color
            margin-right: 8px
          .more
            bg-image('../../common/image/right', 16px, 16px)
</style>
