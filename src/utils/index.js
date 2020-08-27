// 一般工具函数

import { Loading } from 'element-ui'

/**
 * 全局Loading
 */
let loadingService = null
const LIMIT_TIME = 1000
let t = 0

function closeLoading() {
  if (loadingService) {
    loadingService.close()
    loadingService = null
  }
}

export function showLoading(option = {
  text: '加载中...',
  background: 'rgba(242,242,242,0.5)',
  lock: true
}) {
  t = new Date().getTime()
  loadingService = Loading.service(option)
}

export function hideLoading() {
  if (!loadingService) return
  const _t = new Date().getTime() - t
  if (_t < LIMIT_TIME) {
    setTimeout(() => {
      closeLoading()
    }, LIMIT_TIME)
  } else {
    closeLoading()
  }
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

// 获取本地图片数据
export function getLocalImgData(url) {
  const img = new Image()
  img.onload = function() {
    let imgData
    if (this.src.slice(0, 4) === 'data') {
      // 小图片直接拿到 base64
      imgData = this.src
    } else {
      // 大图片需要 canvas 转换
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.height = this.height
      canvas.width = this.width
      ctx.drawImage(this, 0, 0)
      imgData = canvas.toDataURL('image/png')
    }
    // base64 --> blob
    const arr = imgData.split(',')
    const mime = arr[0].match(/:(.*?);/)[1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    const blob = new Blob([u8arr], {
      type: mime
    })
    // do request
    console.log(blob)
  }
  img.src = require(`${url}`)
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
