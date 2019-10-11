<template>
  <div class="main">
    <loading v-if="isLoading"></loading>
    <template v-else>
      <div class="wrapper">
        <div class="amount">
          <div class="lbl">金额</div>
          <cube-input v-model.trim="amount" :placeholder="placeholder" clearable></cube-input>
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
          <cube-button>提现</cube-button>
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
        placeholder: '可提现金额¥234',
        amount: ''
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

  /deep/ input::-webkit-input-placeholder
    letter-spacing: 1px

  .wrapper
    padding: 25px 15px 0
    .amount
      height: 42px
      border: 1px solid $border
      border-radius: 5px
      display: flex
      align-items: center
      .lbl
        padding-left: 15px
      .cube-input
        flex: 1
      .cube-input-field
        line-height: 30px
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
          bg-image('../recharge/selected', 22px, 22px)
      .wechat
        i
          bg-image('../recharge/wechat', 23px, 23px)
      .alipay
        i
          bg-image('../recharge/alipay', 23px, 23px)

</style>
