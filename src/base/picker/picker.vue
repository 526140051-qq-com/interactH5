<template>
  <div class="single" :class="requiredCls" @click="showPicker">
    <label>{{title}}</label>
    <div class="single-select">
      <span>{{text}}</span>
      <i class="cubeic-arrow"></i>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {PICKER_TEXT} from 'common/js/config'

  export default {
    props: {
      data: {
        type: Array,
        default: () => {
          return []
        }
      },
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
        type: Number,
        default: 0
      },
      canClick: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      requiredCls() {
        return this.required && 'required'
      }
    },
    methods: {
      showPicker() {
        if (!this.canClick) return
        if (!this.picker) {
          this.picker = this.$createPicker({
            title: this.title,
            data: [this.data],
            alias: {
              value: 'id',
              text: 'name'
            },
            selectedIndex: [this.selectedIndex],
            onSelect: this.selectHandle
          })
        }
        this.picker.show()
      },
      selectHandle(selectedVal, selectedIndex, selectedText) {
        this.$emit('select', selectedVal[0], selectedText[0])
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~stylus/mixin"
  .single .single-select span
    color: $static

  .single .single-select .cubeic-arrow
    color: $static

  .single .single-select .bold
    color: $dark
</style>
