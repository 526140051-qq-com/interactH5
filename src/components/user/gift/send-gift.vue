<template>
  <div class="main">
    <loading v-if="isLoading"></loading>
    <template v-else>
      <div class="list border-bottom-1px">
        <div class="top">
          <div class="content">直播赠送<span class="blue">涵涵</span><span class="red">一多樱花🌸</span></div>
          <div class="price">-&yen;10.00</div>
        </div>
        <div class="time">{{formatDate(new Date())}}</div>
      </div>
    </template>
  </div>
</template>

<script type="text/ecmascript-6">
  import Loading from 'base/loading/loading'
  import api from 'common/js/api'
  import {ERR_OK} from 'common/js/config'
  import moment from 'moment'

  export default {
    data() {
      return {
        isLoading: true
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

      },
      formatDate(time) {
        return moment(time).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    components: {
      Loading
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~stylus/mixin"

  .list
    padding: 18px 15px
    .top
      display: flex
      justify-content: space-between
      align-items: center
      font-size: 16px
      color: $dark
      .content
        .blue
          margin: 0 6px
          color: #5097fd
        .red
          color: #ec494c
    .time
      color: $gray
      margin: 12px 0 0
</style>
