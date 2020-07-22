import html2canvas from 'html2canvas'
import { saveAs } from 'file-saver'

export function exportHTMLToImg({
  el,
  name = 'example'
}) {
  return new Promise((resolve, reject) => {
    html2canvas(el, {
      logging: false
    }).then(canvas => {
      canvas.toBlob(blob => {
        saveAs(blob, `${name}.png`)
        // resolve(blob)
      })
    }).catch(err => reject(err))
  })
}
