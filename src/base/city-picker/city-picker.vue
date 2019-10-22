<template>
  <div class="single" :class="requiredCls" @click="showAddressPicker">
    <label>{{title}}</label>
    <div class="single-select">
      <span>{{text}}</span>
      <i class="cubeic-arrow"></i>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {PICKER_TEXT, ERR_OK} from 'common/js/config'
  import api from 'common/js/api'
  import {provinceList, cityList} from 'common/js/area'

  const addressData = provinceList
  addressData.forEach(province => {
    province.children = cityList[province.value]
  })

  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      required: {
        type: Boolean,
        default: false
      },
      text: {
        type: String,
        default: PICKER_TEXT
      },
      selectedIndex: {
        type: Array,
        default: () => {
          return [0, 0]
        }
      }
    },
    computed: {
      requiredCls() {
        return this.required && 'required'
      }
    },
    data() {
      return {}
    },
    mounted() {
      this.addressPicker = this.$createCascadePicker({
        title: this.title,
        data: addressData,
        selectedIndex: this.selectedIndex,
        onSelect: this.selectHandle
      })
    },
    methods: {
      showAddressPicker() {
        this.addressPicker.show()
      },
      selectHandle(selectedVal, selectedIndex, selectedText) {
        this.$emit('select', selectedText, selectedIndex)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
