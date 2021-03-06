import axios from 'axios'
import { is } from 'immutable'
// import config from '../config'
// import { store } from '../NextApp'
// import Loaing from '../components/Loading'

var defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Credentials': '*'
}

const instance = axios.create({
  // baseURL: config.baseURL
  // timeout: 10000
})

// const loadingInstance = new Loaing()

export default ({
  method = 'GET',
  data = {},
  url,
  loading = false,
  headers = {}
}) => {
  let options = method === 'GET' ? { params: data } : { data }
  // let token = store ? store.getState().runtime.token : ''

  // if (loading) loadingInstance.show()

  return instance
    .request({
      url: `/api${url}`,
      method,
      headers: {
        ...defaultHeaders,
        ...headers,
        // ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      ...options
    })
    .then(res => {
      if (res.status >= 200 && res.status < 300) {
        return res.data
      }
      return Promise.reject(res)
    })
    .then((response) => {
      let { code, message, data } = response
      if (!data && !code && !message) return response
      return Promise.reject({ code, message })
    })
    .catch(err => {
      if (err.response) {
        return Promise.reject({
          code: err.response.status,
          message:
            err.response.statusText || `请求出错了 ${err.response.status}`
        })
      }
      // if (err.code === 50002) store.dispatch(loginOut())
      if (err instanceof Error) {
        if (/Error: timeout/.test(err)) {
          return Promise.reject({ code: 503, message: '网络连接超时~' })
        }
      }
      if (err.message) return Promise.reject(err)
      return Promise.reject({ message: '网络错误~' })
    })
    .finally(() => {
      // if (loading) loadingInstance.hide()
    })
}
