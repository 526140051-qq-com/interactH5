import axios from 'axios'
import qs from 'qs'
import router from '@/router'
import config from 'common/js/config'
import {Toast} from 'cube-ui'
import {getToken, savePath} from 'common/js/cache'

axios.defaults.baseURL = config.ApiHost
axios.defaults.headers = {
  'Content-Type': 'application/x-www-form-urlencoded'
}
// 设置超时时间
axios.defaults.timeout = 30000

/**
 * 请求拦截器，请求发送之前做些事情
 */
axios.interceptors.request.use(
  config => {
    // 这里需要引入第三方模块qs, POST请求时先格式化data数据
    if (config.method.toLocaleUpperCase() === 'POST') {
      config.data = qs.stringify(config.data)
    }
    // 配置Authorization参数携带用户token
    const token = getToken()
    if (token) config.headers.token = token
    return config
  },
  error => {
    // 此处应为弹窗显示具体错误信息
    // 引入第三方UI框架
    console.error('请求拦截器=====')
    console.error(error)
    return Promise.reject(error)
  }
)

/**
 * 响应拦截器，请求返回异常统一处理
 */
axios.interceptors.response.use(
  response => {
    // 接口请求false,可能是漏传了参数
    // const {data} = response
    // if (data && data.success === false) {
    //   console.error('响应拦截器=====接口出错了')
    // errorHandler(data.message)
    // return Promise.reject(response)
    // }
    return response
  },
  error => {
    console.error('响应拦截器=====error')
    console.error(error)
    console.error('error.response=', error.response)
    // 超时error捕获
    const str = error + ''
    if (str.search('timeout') !== -1) {
      console.error('超时了')
      errorHandler('请求超时了')
      return
    }
    // 1.请求错误 4xx
    // 2.服务器错误 5xx
    if (error && error.response) {
      switch (error.response.status) {
        case 401: // token失效
          tokenHandler('页面已过期')
          break
        case 403: // 拒绝访问
          errorHandler('403 -- 拒绝访问')
          break
        case 404: // 服务器找不到请求的网页
          errorHandler('404 -- 请求地址出错')
          break
        case 500: // 服务器内部错误
          errorHandler('500 -- 服务器内部错误')
          break
        case 503: // 服务不可用
          errorHandler('503 -- 服务器超载或停机维护')
          break
        default: // 其它错误
          errorHandler('哇喔，网络出错了')
          break
      }
    } else {
      errorHandler('哇喔，网络出错了')
    }
    // return Promise.reject(error)
  }
)

/**
 * 报错回调处理
 */
function errorHandler(message) {
  const path = window.location.href
  Toast.$create({
    txt: message,
    type: 'error',
    zIndex: 10001,
    onTimeout: () => {
      router.replace('/error')
      savePath(path)
    }
  }).show()
}

/**
 * token失效回调处理
 */
function tokenHandler(message) {
  Toast.$create({
    txt: message,
    type: 'error',
    zIndex: 10001,
    onTimeout: () => {
      router.replace('/')
    }
  }).show()
}

export default axios
