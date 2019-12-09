import request from '@/utils/request'
import { urlUser } from '@/utils/url.js'

export function login(data) {
  return request({
    url: urlUser + '/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: urlUser + '/info',
    method: 'get'
  })
}
