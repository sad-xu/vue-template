import { showLoading, hideLoading } from '@/utils'

// 导出excel
export function exportExcel(option) {
  showLoading()
  setTimeout(() => {
    import('./excel.js').then(exportFn => {
      hideLoading()
      exportFn.exportJSONToExcel(option)
    })
  }, 100)
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
      hideLoading()
      exportFn.exportHTMLToImg(option)
    })
  }, 100)
}

/**
 * 导出图片 - 2
 * 无loading + Promise包装
 */
export function exportImg2(option) {
  return import('./img.js').then(exportFn => {
    return exportFn.exportHTMLToImg(option)
  })
}

// 导出PDF
export function exportPDF(option) {
  showLoading()
  setTimeout(() => {
    import('./pdf.js').then(exportFn => {
      hideLoading()
      exportFn.exportHTMLToPDF(option)
    })
  }, 100)
}
