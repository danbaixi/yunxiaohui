// main.js

import createRequest from '../utils/request'

// 登录请求
export function loginRequest(data) {
  return createRequest({
    url: '/login',
    method: 'POST',
    data,
    needLogin: false // 注意，这里要为false
  })
}