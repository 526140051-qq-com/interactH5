import axios from 'common/js/axios'
import {getUserId} from 'common/js/cache'

/**
 * axios封装post请求
 * @url url
 * @params 参数
 */
function post(url, params = {}) {
  return new Promise((resolve, reject) => {
    if (!params.userId && getUserId()) params.userId = getUserId()
    axios.post(url, params)
      .then(res => {
        resolve(res.data)
      }, err => {
        reject(err.data)
      })
  })
}

/**
 * 获取年龄
 * @returns {age}
 */
function getAge(UUserCard) {
  let myDate = new Date()
  let month = myDate.getMonth() + 1
  let day = myDate.getDate()
  let age = myDate.getFullYear() - UUserCard.substring(6, 10) - 1
  if (UUserCard.substring(10, 12) < month || UUserCard.substring(10, 12) === month && UUserCard.substring(12, 14) <= day) {
    age++
  }
  return age
}

function findIndex(ary, fn) {
  if (ary.findIndex) {
    return ary.findIndex(fn)
  }
  /* istanbul ignore next */
  let index = -1
  /* istanbul ignore next */
  ary.some(function (item, i, ary) {
    const ret = fn.call(this, item, i, ary)
    if (ret) {
      index = i
      return ret
    }
  })
  /* istanbul ignore next */
  return index
}

export {
  post,
  getAge,
  findIndex
}
