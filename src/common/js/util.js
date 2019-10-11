import axios from 'common/js/axios'
import {getUserId} from 'common/js/cache'

/**
 * axios封装post请求
 * @url url
 * @params 参数
 */
function post(url, params = {}) {
  return new Promise((resolve, reject) => {
    if (getUserId()) params.userId = getUserId()
    axios.post(url, params)
      .then(res => {
        resolve(res.data)
      }, err => {
        reject(err.data)
      })
  })
}

export {
  post
}
