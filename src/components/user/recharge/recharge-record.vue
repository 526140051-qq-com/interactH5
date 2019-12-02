<template>
  <div class="main">
    <loading v-if="isLoading"></loading>
    <template v-else>
      <cube-tab-bar
        v-model="selectedLabel"
        show-slider
        :use-transition="disabled"
        ref="tabNav"
        :data="tabLabels">
      </cube-tab-bar>
      <div class="tab-slide-container">
        <cube-slide
          ref="slide"
          :loop="loop"
          :initial-index="initialIndex"
          :auto-play="autoPlay"
          :show-dots="showDots"
          :options="slideOptions"
          @scroll="scroll"
          @change="changePage"
        >
          <!-- 门票 -->
          <cube-slide-item>
            <cube-scroll
              ref="scroll1"
              :data="list"
              :options="scrollOptions"
              @pulling-up="onPullingUp">
              <ul v-if="list.length" class="list-wrapper">
                <li v-for="item in list" :key="item.id" class="list border-bottom-1px">
                  <div class="top">
                    <div class="content">{{item.chargeName}}充值成功</div>
                    <div class="price">+&yen;{{item.payMoney.toFixed(2)}}</div>
                  </div>
                  <div class="time">{{item.createTime | formatDate('s')}}</div>
                </li>
              </ul>
              <div v-else class="no-result-wrapper">
                <no-result title="暂无门票充值记录"></no-result>
              </div>
            </cube-scroll>
          </cube-slide-item>
          <!-- 房间 -->
          <cube-slide-item>
            <cube-scroll
              ref="scroll2"
              :data="list"
              :options="scrollOptions"
              @pulling-up="onPullingUp">
              <ul v-if="list.length" class="list-wrapper">
                <li v-for="item in list" :key="item.id" class="list border-bottom-1px">
                  <div class="top">
                    <div class="content">充值成功</div>
                    <div class="price">+&yen;{{item.payMoney.toFixed(2)}}</div>
                  </div>
                  <div class="time">{{item.createTime | formatDate('s')}}</div>
                </li>
              </ul>
              <div v-else class="no-result-wrapper">
                <no-result title="暂无房间充值记录"></no-result>
              </div>
            </cube-scroll>
          </cube-slide-item>
          <!-- 礼物 -->
          <cube-slide-item>
            <cube-scroll
              ref="scroll3"
              :data="list"
              :options="scrollOptions"
              @pulling-up="onPullingUp">
              <ul v-if="list.length" class="list-wrapper">
                <li v-for="item in list" :key="item.id" class="list border-bottom-1px">
                  <div class="top">
                    <div class="content">充值成功</div>
                    <div class="price">+&yen;{{item.payMoney.toFixed(2)}}</div>
                  </div>
                  <div class="time">{{item.createTime | formatDate('s')}}</div>
                </li>
              </ul>
              <div v-else class="no-result-wrapper">
                <no-result title="暂无礼物充值记录"></no-result>
              </div>
            </cube-scroll>
          </cube-slide-item>
        </cube-slide>
      </div>
    </template>
  </div>
</template>

<script type="text/ecmascript-6">
  import Loading from 'base/loading/loading'
  import NoResult from 'base/no-result/no-result'
  import api from 'common/js/api'
  import {ERR_OK} from 'common/js/config'
  import {findIndex} from 'common/js/util'

  export default {
    data() {
      return {
        isLoading: true,
        selectedLabel: '门票',
        disabled: false,
        tabLabels: [{
          label: '门票'
        }, {
          label: '房间'
        }, {
          label: '礼物'
        }],
        loop: false,
        autoPlay: false,
        showDots: false,
        slideOptions: {
          listenScroll: true,
          probeType: 3,
          directionLockThreshold: 0
        },
//        scrollOptions: {
//          directionLockThreshold: 0
//        },
        type: 1, // 1、门票 2、房间 3、礼物
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
      initialIndex() {
        let index = 0
        index = findIndex(this.tabLabels, item => item.label === this.selectedLabel)
        return index
      },
      scrollOptions() {
        return {
          pullUpLoad: this.pullUpLoadObj,
          scrollbar: false,
          directionLockThreshold: 0
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
          this.$post(api.getPayLogPager, {
            type: this.type, // 1、门票 2、房间 3、礼物
            state: 2, // 1、已经下单 2、充值成功 3、充值失败
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
        console.log('onPullingUp')
        if (this.pageNum < this.pageTotal) {
          this.pageNum++
          this.getData().then(res => {
            const {list} = res
            this.list = this.list.concat(list)
          })
        } else { // 如果没有新数据
          this.$refs[`scroll${this.type}`].forceUpdate()
        }
      },
      async changePage(current) {
        this.selectedLabel = this.tabLabels[current].label
        this.type = current + 1
        this.pageNum = 1
        const {count, list} = await this.getData()
        this.pageTotal = Math.ceil(count / this.pageSize)
        this.list = list
        this.$refs[`scroll${this.type}`].scrollTo(0, 0)
      },
      scroll(pos) {
        const x = Math.abs(pos.x)
        const tabItemWidth = this.$refs.tabNav.$el.clientWidth
        const slideScrollerWidth = this.$refs.slide.slide.scrollerWidth
        const deltaX = x / slideScrollerWidth * tabItemWidth
        this.$refs.tabNav.setSliderTransform(deltaX)
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

  /deep/ .cube-tab
    > div
      position: relative
      top: -5px

  .tab-slide-container
    position: fixed
    top: 44px
    bottom: 0
    width: 100%
    .list-wrapper
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
