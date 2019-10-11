export function activeElementScrollIntoView(activeElement, delay) { // 获取到焦点元素滚动到可视区
  let editable = activeElement.getAttribute('contenteditable')
  // input、textarea或富文本获取焦点后没有将该元素滚动到可视区
  if (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA' || editable === '' || editable) {
    setTimeout(() => {
      activeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
    }, delay)
  }
}

export function checkIOSVersion() {
  // 微信浏览器版本6.7.4+IOS12会出现键盘收起后，视图被顶上去了没有下来
  /* eslint-disable no-useless-escape */
  let wechatInfo = window.navigator.userAgent.match(/MicroMessenger\/([\d\.]+)/i)
  if (!wechatInfo) return
  let wechatVersion = wechatInfo[1]
  let version = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/)
  if (+wechatVersion.replace(/\./g, '') >= 674 && +version[1] >= 12) {
    window.inputFocuseTimeout && clearTimeout(window.inputFocuseTimeout)
    window.inputFocuseTimeout = setTimeout(() => {
      window.scrollTo(0, Math.max(document.body.clientHeight, document.documentElement.clientHeight))
    }, 0)
  }
}

export function focusHandler() {
  // 元素获取焦点时，由webview滚动元素至可是区域
  window.inputFocuseTimeout && clearTimeout(window.inputFocuseTimeout)
}
