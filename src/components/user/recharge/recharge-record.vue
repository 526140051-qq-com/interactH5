<template>
  <div class="main">
    <loading v-if="isLoading"></loading>
    <template v-else>

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

      }
    },
    components: {
      Loading
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
