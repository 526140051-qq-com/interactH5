<template>
  <div class="main">
    <loading v-if="isLoading"></loading>
    <template v-else>
      <div class="wrapper">
        <div class="amount border-bottom-1px">
          <div class="time">支付剩余时间：14:23</div>
          <div class="money">¥{{amount}}</div>
          <div class="tag">入场费</div>
        </div>
        <div class="payment">
          <div @click="payHandler(1)" :class="{'active': type === 1}" class="pay wechat border-bottom-1px">
            <div class="pay-l">
              <i></i>
              <span>微信支付</span>
            </div>
            <div class="pay-r"></div>
          </div>
          <div @click="payHandler(2)" :class="{'active': type === 2}" class="pay alipay border-bottom-1px">
            <div class="pay-l">
              <i></i>
              <span>支付宝支付</span>
            </div>
            <div class="pay-r"></div>
          </div>
        </div>
        <div class="submit">
          <cube-button>确认支付 ¥{{amount}}</cube-button>
        </div>
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
        type: 1,
        amount: '12.00'
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
      // 选择支付方式
      payHandler(type) {
        this.type = type
      }
    },
    components: {
      Loading
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~stylus/mixin"

  .wrapper
    padding: 25px 15px 0
    .amount
      text-align: center
      padding-bottom: 25px
      .time
        color: #bbb
      .money
        font-size: 24px
        color: $dark
        margin: 18px 0 10px
      .tag
        font-size: 12px
        color: #bbb
    .payment
      margin: 15px 0 30px
      .pay
        padding: 0 15px
        height: 48px
        line-height: 48px
        display: flex
        align-items: center
        justify-content: space-between
        &.active
          border-color: $color
          .pay-r
            display: block
        .pay-l
          display: flex
          align-items: center
          span
            margin-left: 10px
            color: $dark
        .pay-r
          display: none
          bg-image('../user/recharge/selected', 22px, 22px)
      .wechat
        i
          bg-image('../user/recharge/wechat', 23px, 23px)
      .alipay
        i
          bg-image('../user/recharge/alipay', 23px, 23px)

</style>
