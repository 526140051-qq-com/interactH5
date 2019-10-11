<template>
  <div class="main">
    <loading v-if="isLoading"></loading>
    <template v-else>
      <div class="wrapper">
        <div class="section">
          <div class="title">充值金额</div>
          <div class="amount">
            <div
              @click="amountHandler(item)"
              v-for="(item, index) in box"
              :key="item.id"
              :class="{'active': item.isActive}"
              class="box">{{item.name}}
            </div>
          </div>
          <div v-show="box[box.length-1].isActive" class="amount-input border-bottom-1px">
            <cube-input v-model.trim="amount" type="number" pattern="\d*" clearable></cube-input>
          </div>
        </div>
        <div class="section">
          <div class="title paytitle">支付方式</div>
          <div class="payment">
            <div @click="payHandler(1)" :class="{'active': type === 1}" class="pay wechat">
              <div class="pay-l">
                <i></i>
                <span>微信支付</span>
              </div>
              <div class="pay-r"></div>
            </div>
            <div @click="payHandler(2)" :class="{'active': type === 2}" class="pay alipay">
              <div class="pay-l">
                <i></i>
                <span>支付宝支付</span>
              </div>
              <div class="pay-r"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="foot border-top-1px">
        <div class="foot-l">
          <span class="lbl">充值</span>
          <span class="money">&yen;{{amount || 0}}</span>
        </div>
        <div class="foot-r">
          <cube-button @click="submit" class="mini">充值</cube-button>
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
        amount: '',
        box: [
          {
            id: 0,
            text: 10,
            name: '10元',
            isActive: true
          },
          {
            id: 1,
            text: 50,
            name: '50元',
            isActive: false
          },
          {
            id: 2,
            text: 100,
            name: '100元',
            isActive: false
          },
          {
            id: 3,
            text: 200,
            name: '200元',
            isActive: false
          },
          {
            id: 4,
            text: '',
            name: '其它金额',
            isActive: false
          }
        ],
        type: 1 // 支付方式
      }
    },
    created() {
      this.amount = this.box[0].text
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
      // 选择金额
      amountHandler(item) {
        this.amount = item.text
        this.box.forEach((v, i) => {
          v.isActive = false
          if (i === item.id) v.isActive = true
        })
      },
      // 选择支付方式
      payHandler(type) {
        this.type = type
      },
      // 充值
      submit() {
        if (!this.amount) {
          this.$toast('请输入充值金额')
          return
        }
        console.log(this.type)
      }
    },
    components: {
      Loading
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~stylus/mixin"

  /deep/ .cube-input
    line-height: 30px
    .cube-input-field
      padding: 0 10px 0 20px
      font-size: 16px

  .wrapper
    padding: 30px 15px 0
    .section
      .title
        font-size: 16px
        color: $dark
        margin-bottom: 15px
      .paytitle
        margin: 20px 0
      .amount
        display: flex
        flex-wrap: wrap
        .box
          width: calc((100% - 30px) / 4)
          height: 36px
          line-height: 36px
          margin: 0 0 10px 10px
          text-align: center
          border-radius: 2px
          color: $dark
          background: #e4e4e4
          &:nth-child(4n+1)
            margin: 0 0 10px 0
          &.active
            color: #fff
            background: $color

      .amount-input
        padding: 10px 0 5px
        position: relative
        font-size: 16px
        &:before
          content: '¥'
          position: absolute
          left: 0
          top: 19px
          z-index: 9
      .payment
        .pay
          padding: 0 15px
          height: 48px
          line-height: 48px
          border-radius: 30px
          border: #e4e4e4 1px solid
          display: flex
          align-items: center
          justify-content: space-between
          margin-top: 15px
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
            bg-image('./selected', 22px, 22px)
        .wechat
          i
            bg-image('./wechat', 23px, 23px)
        .alipay
          i
            bg-image('./alipay', 23px, 23px)

  .foot
    position: fixed
    bottom: 0
    left: 0
    width: 100%
    height: 50px
    overflow: hidden
    display: flex
    justify-content: space-between
    align-items: center
    padding: 0 15px
    box-sizing: border-box
    .foot-l
      font-size: 16px
      .lbl
        color: $dark
        margin-right: 10px
      .money
        letter-spacing: 1px
        color: $color
    .foot-r
      .mini
        width: 86px
</style>
