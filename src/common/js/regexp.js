/*
 * 检查设备
 */
function UA() {
  // 获取访问的user-agent
  let ua = navigator.userAgent || window.navigator.userAgent
  // 判断user-agent
  let isWX = /MicroMessenger/i.test(ua) // 微信端
  let isIOS = /(iPhone|iPad|iPod|iOS)/i.test(ua) // 苹果家族
  let isAndroid = /(android|nexus|Android)/i.test(ua) // 安卓家族
  let isWindows = /(Windows Phone|windows[\s+]phone)/i.test(ua) // 微软家族
  let isBlackBerry = /BlackBerry/i.test(ua) // 黑莓家族
  let isApp = /leledaiapp/i.test(ua) // 手机app
  return {
    isWX,
    isIOS,
    isAndroid,
    isWindows,
    isBlackBerry,
    isApp
  }
}

export {UA}
