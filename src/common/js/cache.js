import storage from 'good-storage'

const TOKEN_KEY = '__token__'
const USER_KEY = '__user__'
const PATH_KEY = '__path__'
const TIME_KEY = '__time__'
const USERID_KEY = '__userId__'

// 保存报错的path
export function savePath(path) {
  storage.session.set(PATH_KEY, path)
}

// 获取报错的path
export function getPath() {
  const path = storage.session.get(PATH_KEY, '')
  return path
}

// 保存token
export function saveToken(data) {
  storage.session.set(TOKEN_KEY, data)
}

// 获取token
export function getToken() {
  const token = storage.session.get(TOKEN_KEY, '')
  return token
}

// 清空token
export function clearToken() {
  storage.session.remove(TOKEN_KEY)
}

// 保存管理员信息
export function saveUser(data) {
  storage.session.set(USER_KEY, data)
}

// 获取管理员信息
export function getUser() {
  let user = storage.session.get(USER_KEY, {})
  if (!user.id) {
    return false
  }
  return user
}

// 管理员退出登录
export function clearUser() {
  storage.session.remove(USER_KEY)
}

// 保存token时间（token更新的时间）
export function saveExpireTime(time) {
  storage.session.set(TIME_KEY, time)
}

// 获取token时间（token更新的时间）
export function getExpireTime() {
  const time = storage.session.get(TIME_KEY, '')
  return time
}

// 获取token时间（token更新的时间）
export function clearExpireTime() {
  storage.session.remove(TIME_KEY)
}

// 存储用户ID
export function saveUserId() {
  const ua = navigator.userAgent
  if (ua.includes('userId=')) {
    const userId = ua.split('userId=')[1]
    if (!getUserId() || getUserId() !== parseInt(userId)) {
      storage.set(USERID_KEY, parseInt(userId))
    }
  }
}

// 获取用户ID
export function getUserId() {
  const userId = storage.get(USERID_KEY, '')
  return parseInt(userId)
}
