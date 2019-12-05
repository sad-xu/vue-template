import html2Canvas from 'html2canvas'
import jsPDF from 'jspdf'

/**
 * 导出PDF
 *  name: String
 *  elList: [element]
 */
export function exportHTMLToPDF({
  name = 'default',
  elList = []
}) {
  return Promise.all(elList.map(el => {
    return html2Canvas(el, {
      logging: false
    })
  })).then(canvasList => {
    /* eslint-disable-next-line */
    let pdf = new jsPDF('', 'pt', 'a4')
    // a4 595.28 / 841.89
    let len = canvasList.length - 1
    canvasList.forEach((canvas, i) => {
      let imgWidth = Number(canvas.style.width.slice(0, -2))
      let imgHeight = Number(canvas.style.height.slice(0, -2))
      pdf.addImage(canvas, 'JPEG', 0, 0, 595.28, 595.28 * imgHeight / imgWidth)
      if (len !== i) pdf.addPage()
    })
    pdf.save(name)
  })
}
