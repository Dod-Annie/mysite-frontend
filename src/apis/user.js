import request from './request'

// 登录
export const login = data => {
  return request({
    url: '/user/login',
    method: 'POST',
    data
  })
}

//注册
export const regist = data => {
  return request({
    url: '/user/regist',
    method: 'POST',
    data
  })
}
