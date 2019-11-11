import request from './request'

// 请求验证码
export const getVerify = data => {
  return request({
    url: '/verify/getVerify',
    method: 'GET',
  })
}

// 校验验证码
export const checkVerify = data => {
  return request({
    url: '/verify/checkVerify',
    method: 'POST',
    data
  })
}
