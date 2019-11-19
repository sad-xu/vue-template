// 一般工具函数

import { Loading } from 'element-ui'

/**
 * 全局Loading
 */
const loadingService = Loading.service
const LIMIT_TIME = 1000
let t = 0

export function showLoading(option = {
  text: '加载中...',
  background: 'rgba(242,242,242,0.5)',
  lock: true
}) {
  t = new Date().getTime()
  loadingService(option)
}

export function hideLoading() {
  let _t = new Date().getTime() - t
  if (_t < LIMIT_TIME) {
    setTimeout(() => {
      loadingService().close()
    }, LIMIT_TIME)
  } else loadingService().close()
}
