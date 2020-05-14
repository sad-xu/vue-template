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

/**
 * 动态加载资源
 *
 */
export function loadSrc(src) {
  const existingScriptDom = document.getElementById(src)
  return new Promise((resolve, reject) => {
    if (!existingScriptDom) {
      const scriptDom = document.createElement('script')
      scriptDom.src = src
      scriptDom.id = src
      document.body.appendChild(scriptDom)
      if ('onload' in scriptDom) {
        scriptDom.onload = function() {
          this.onerror = this.onload = null
          resolve()
        }
        scriptDom.onerror = function(err) {
          this.onerror = this.onload = null
          reject(err)
        }
      } else {
        scriptDom.onreadystatechange = function() {
          if (this.readyState !== 'complete' && this.readyState !== 'loaded') return
          this.onreadystatechange = null
          resolve()
        }
      }
    } else resolve()
  })
}

/**
 * 简易防抖
 *
 */
export function debounce(fn, wait = 300) {
  let timeId = null
  return function(...args) {
    window.clearTimeout(timeId)
    timeId = window.setTimeout(() => {
      fn.apply(this, args)
    }, wait)
  }
}

/**
 * 简易节流
 *
 */
export function throttle(fn, wait = 100) {
  let timeId = null
  return function(...args) {
    if (timeId) return
    timeId = window.setTimeout(() => {
      fn.apply(this, args)
      timeId = null
    }, wait)
  }
}
