import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
// import { getToken } from '@/utils/auth'

const service = axios.create({
  baseURL: '' // url = base url + request url
  // withCredentials: true
})

service.interceptors.request.use(
  config => {
    // let token = store.getters.token
    // if (token) {
    //   // config.headers['X-Token'] = getToken()
    // }
    if (!config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code) {
      if (res.code === 99999) {
        MessageBox.alert('已登出', '提示', {
          confirmButtonText: '重新登陆'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(res.code)
    } else return res.data
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
