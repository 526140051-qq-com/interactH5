import 'babel-polyfill'
import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import 'common/stylus/index.styl'
import {post} from 'common/js/util'
import FastClick from 'fastclick'
import {saveUserId} from 'common/js/cache'
import * as custom from './common/js/filter'
/* eslint-disable no-unused-vars */
// import vConsole from 'vconsole'

// 存储用户ID
saveUserId()

Vue.config.productionTip = false
Vue.prototype.$post = post
// 解决click点击300毫秒延时问题 （IOS11及以上的系统已经修复了点击延迟300毫秒的问题）
const device = navigator.userAgent.toLowerCase().match(/cpu iphone os (.*?) like mac os/)
if (!device || parseInt(device[1]) < 12) {
  FastClick.attach(document.body)
}
// 导出的是对象，可以直接通过 key 和 value 来获得过滤器的名和过滤器的方法
Object.keys(custom).forEach(key => {
  Vue.filter(key, custom[key])
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
