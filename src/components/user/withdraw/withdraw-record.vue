<template>
  <div class="main">
    <loading v-if="isLoading"></loading>
    <template v-else>
      <div class="scroll-list-wrap">
        <cube-scroll
          ref="scroll"
          :data="list"
          :options="options"
          @pulling-up="onPullingUp">
          <div class="wrapper">
            <ul v-if="list.length">
              <li v-for="item in list" :key="item.id" class="list border-bottom-1px">
                <div class="top">
                  <div class="content">提现成功</div>
                  <div class="price">-&yen;{{item.money.toFixed(2)}}</div>
                </div>
                <div class="time">{{item.createTime | formatDate('s')}}</div>
              </li>
            </ul>
            <div v-else class="no-result-wrapper">
              <no-result title="暂无提现记录"></no-result>
            </div>
          </div>
        </cube-scroll>
      </div>
    </template>
  </div>
</template>

<script type="text/ecmascript-6">
  import Loading from 'base/loading/loading'
  import NoResult from 'base/no-result/no-result'
  import api from 'common/js/api'
  import {ERR_OK} from 'common/js/config'

  export default {
    data() {
      return {
        isLoading: true,
        pageNum: 1,
        pageSize: 10,
        pageTotal: 1,
        list: [],
        pullUpLoad: true,
        pullUpLoadThreshold: 0,
        pullUpLoadMoreTxt: '上拉加载更多',
        pullUpLoadNoMoreTxt: '^-^ 没有更多数据了'
      }
    },
    computed: {
      options() {
        return {
          pullUpLoad: this.pullUpLoadObj,
          scrollbar: true
        }
      },
      pullUpLoadObj: function () {
        return this.pullUpLoad ? {
          threshold: parseInt(this.pullUpLoadThreshold),
          txt: {
            more: this.pageTotal > 1 ? this.pullUpLoadMoreTxt : '',
            noMore: this.pageTotal > 1 ? this.pullUpLoadNoMoreTxt : ''
          }
        } : false
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      async fetchData() {
        const {count, list} = await this.getData()
        this.pageTotal = Math.ceil(count / this.pageSize)
        this.list = list
        this.isLoading = false
      },
      getData() {
        return new Promise(resolve => {
          this.$post(api.wxWithdrawalPager, {
            pageNum: this.pageNum,
            pageSize: this.pageSize
          }).then(res => {
            if (res.code === ERR_OK) {
              resolve(res.data)
            }
          })
        })
      },
      // 上拉加载
      onPullingUp() {
        if (this.pageNum < this.pageTotal) {
          this.pageNum++
          this.getData().then(res => {
            const {list} = res
            this.list = this.list.concat(list)
          })
        } else { // 如果没有新数据
          this.$refs.scroll.forceUpdate()
        }
      }
    },
    components: {
      Loading,
      NoResult
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
    .list
      padding: 18px 15px
      .top
        display: flex
        justify-content: space-between
        align-items: center
        font-size: 16px
        color: $dark
      .time
        color: $gray
        margin: 12px 0 0
</style>
