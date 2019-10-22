import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
// import { getToken } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.BASE_API, // url = base url + request url
  // withCredentials: true
})

service.interceptors.request.use(
  config => {
    // let token = store.getters.token
    // if (token) {
    //   // config.headers['X-Token'] = getToken()
    // }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.error) {
      if (res.error === 99999) {
        MessageBox.alert('已登出', '提示', {
          confirmButtonText: '重新登陆'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return res
    } else return res
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
