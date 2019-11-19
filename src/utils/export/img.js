import html2canvas from 'html2canvas'
import { saveAs } from 'file-saver'

export function exportHTMLToImg({
  el,
  name = 'example'
}) {
  return html2canvas(el, {
    logging: false
  }).then(canvas => {
    console.log('canvas')
    canvas.toBlob(blob => {
      console.log('blob')
      saveAs(blob, `${name}.png`)
    })
  })
}
