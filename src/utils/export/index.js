import { showLoading, hideLoading } from '@/utils'

// 导出excel
export function exportExcel(option) {
  showLoading()
  import('./excel.js').then(exportFn => {
    hideLoading()
    exportFn.exportJSONToExcel(option)
  })
}

/**
 * 导出图片
 *  el
 *  name
 */
export function exportImg(option) {
  showLoading()
  setTimeout(() => {
    import('./img.js').then(exportFn => {
      return exportFn.exportHTMLToImg(option)
    }).then(() => {
      console.log('hideLoading')
      hideLoading()
    })
  }, 100)
}
