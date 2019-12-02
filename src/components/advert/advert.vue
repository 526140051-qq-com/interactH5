<template>
  <div class="main">
    <loading v-if="isLoading"></loading>
    <template v-else>
      <div class="scroll-list-wrap">
        <cube-scroll
          ref="scroll">
          <div class="wrapper" v-html="content"></div>
        </cube-scroll>
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
        content: ''
      }
    },
    created() {
      this.adverId = this.$route.params.id
      this.fetchData()
    },
    methods: {
      async fetchData() {
        let data = await this.getData()
        this.content = data.content
        this.isLoading = false
        this.doRefresh()
      },
      doRefresh() {
        this.$nextTick(() => {
          this.$refs.scroll.refresh()
        })
      },
      getData() {
        return new Promise(resolve => {
          this.$post(api.selectAdverById, {
            adverId: this.adverId
          }).then(res => {
            if (res.code === ERR_OK) {
              resolve(res.data)
            }
          })
        })
      }
    },
    components: {
      Loading
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .scroll-list-wrap
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    overflow: hidden
    .wrapper
      line-height: 1.4
      text-align: justify
      padding: 20px 15px
</style>
