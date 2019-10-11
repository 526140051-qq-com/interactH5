import Vue from 'vue'

import Cube, {
  /* eslint-disable no-unused-vars */
  Style,
  // basic
  Loading,
  Button,
  Dialog,
  Toast,
  Scroll
} from 'cube-ui'

Vue.use(Cube)
Vue.use(Loading)
Vue.use(Button)
Vue.use(Dialog)
Vue.use(Toast)
Vue.use(Scroll)
Object.assign(Vue.prototype, {
  $loading: {
    loadingInstance: '',
    show: function (txt) {
      this.loadingInstance = Toast.$create({
        txt: txt || '提交中...',
        type: 'loading',
        time: 0,
        mask: true
      })
      this.loadingInstance.show()
    },
    hide: function () {
      this.loadingInstance.hide()
    }
  },
  $toast(txt, type, time) {
    Toast.$create({
      txt,
      type: type || 'warn',
      time: time || 1500,
      zIndex: 10001
    }).show()
  },
  $dialog(content, flag, cb) {
    if (flag) {
      Dialog.$create({
        type: 'alert',
        content,
        icon: 'cubeic-alert',
        onConfirm: () => {
          cb && cb()
        }
      }).show()
    } else {
      Dialog.$create({
        content,
        onConfirm: () => {
          cb && cb()
        }
      }).show()
    }
  },
  $confirm(title, cb) {
    Dialog.$create({
      type: 'confirm',
      title,
      onConfirm: () => {
        cb && cb()
      }
    }).show()
  }
})
