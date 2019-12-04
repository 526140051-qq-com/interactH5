<template>
  <div class="main">
    <loading v-if="isLoading"></loading>
    <template v-else>
      <div class="wrapper">
        <div class="title">
          <div class="lbl">提现金额</div>
          <div @click="getAllMoney" class="all">全部提现</div>
        </div>
        <div class="amount">
          <div class="lbl">¥</div>
          <cube-input v-model.number="amount" placeholder="请输入提现金额" clearable></cube-input>
        </div>
        <div v-if="false" class="payment">
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
        <div class="tips">账户余额: {{totalMoney}}元，扣除{{percent}}%的平台费</div>
        <div class="submit">
          <cube-button @click="doSubmit">{{btnTxt}}</cube-button>
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
        clickMore: true,
        btnTxt: '提现',
        totalMoney: '',
        amount: '',
        percent: '' // 提醒扣除比例
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      async fetchData() {
        const [user, ret] = await Promise.all([
          this.findUserById(),
          this.selectByKey()
        ])
        this.totalMoney = user.money
        this.percent = ret.vals
        this.isLoading = false
      },
      // 根据用户ID获取用户信息
      findUserById() {
        return new Promise(resolve => {
          this.$post(api.findUserById).then(res => {
            if (res.code === ERR_OK) {
              resolve(res.data)
            }
          })
        })
      },
      // 平台设置查询
      selectByKey() {
        return new Promise(resolve => {
          this.$post(api.selectByKey).then(res => {
            if (res.code === ERR_OK) {
              resolve(res.data)
            }
          })
        })
      },
      // 全部提现
      getAllMoney() {
        this.amount = this.totalMoney
      },
      // 提现
      doSubmit() {
        if (!this.amount) {
          this.$toast('请输入提现金额')
          return
        }
        if (this.amount > this.totalMoney) {
          this.$toast('提现金额不能大于账户余额')
          return
        }
        if (this.clickMore) {
          this.clickMore = false
          this.btnTxt = '提交中...'
          this.$post(api.addWithdraw, {
            money: this.amount
          }).then(res => {
            if (res.code === ERR_OK) {
              this.totalMoney -= this.amount
              this.amount = ''
              this.$toast('提现成功', 'correct')
            } else {
              this.$toast(res.message, 'error')
            }
            this.btnTxt = '提现'
            this.clickMore = true
          })
        }
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
    .title
      display: flex
      justify-content: space-between
      align-items: center
      margin-bottom: 12px
      .lbl
        color: $dark
      .all
        color: $color
        extend-click()
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

    .tips
      color: $gray
      font-size: 13px
      margin: 10px 0 50px
</style>
