import html2canvas from 'html2canvas'
import { saveAs } from 'file-saver'

export function exportHTMLToImg({
  el,
  name = 'example'
}) {
  html2canvas(el, {
    logging: false
  }).then(canvas => {
    canvas.toBlob(blob => {
      saveAs(blob, `${name}.png`)
    })
  })
}
