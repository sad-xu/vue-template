import XLSX from 'xlsx'
import { saveAs } from 'file-saver'

function sheetFromArrOfArr(data) {
  let ws = {}
  let range = {
    s: {
      c: 1000,
      r: 1000
    },
    e: {
      c: 0,
      r: 0
    }
  }
  data.forEach((row, R) => {
    row.forEach((cell, C) => {
      if (range.s.c > C) range.s.c = C
      if (range.s.r > R) range.s.r = R
      if (range.e.c < C) range.e.c = C
      if (range.e.r < R) range.e.r = R
      if (cell === null) return
      cell = cell instanceof Object ? cell : { v: cell }
      let cellRef = XLSX.utils.encode_cell({
        c: C,
        r: R
      })
      if (typeof cell.v === 'number') cell.t = 'n'
      else if (typeof cell.v === 'boolean') cell.t = 'b'
      else cell.t = 's'
      ws[cellRef] = cell
    })
  })
  if (range.s.c < 1000) ws['!ref'] = XLSX.utils.encode_range(range)
  return ws
}

function s2ab(s) {
  let buf = new ArrayBuffer(s.length)
  let view = new Uint8Array(buf)
  for (let i = 0; i < s.length; i++) {
    view[i] = s.charCodeAt(i) & 0xFF
  }
  return buf
}

export function exportJSONToExcel({
  data,
  filename = 'excel',
  option = {}
}) {
  let wb = {
    SheetNames: [],
    Sheets: {}
    // Props: {
    //   Author: 'xhc'
    // }
  }
  let ws = sheetFromArrOfArr(data)
  // 所有单元格宽度 固定12
  const colWidth = data.map(row => row.map(v => {
    return ({ wch: 12 })
  }))
  let cols = colWidth[0]
  // for (let i = 0; i < colWidth.length; i++) {
  //   for (let j = 0; j < colWidth.length; j++) {
  //     if (!cols[j]) {
  //       cols[j] = { wch: 12 }
  //     }
  //   }
  // }
  ws['!cols'] = cols
  // 合并制定位置单元格
  if (option.merges) ws['!merges'] = option.merges

  const sheetName = 'sheet-1'
  wb.SheetNames.push(sheetName)
  wb.Sheets[sheetName] = ws
  const wbout = XLSX.write(wb, {
    bookType: 'xlsx',
    type: 'binary'
  })
  saveAs(new Blob([s2ab(wbout)], {
    type: 'application/octet-stream'
  }), `${filename}.xlsx`)
}
