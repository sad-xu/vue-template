import Excel from 'exceljs'
import { saveAs } from 'file-saver'

// 参考文档 https://github.com/exceljs/exceljs/blob/master/README_zh.md

/*
 data = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  ]
  bold = [[2, 2], [3, 3], [4, 4]]
  merge = [
    [[5, 1], [6, 2]],
    [[5, 7], [6, 8]]
  ]
  border = [
    [[1, 1], [2, 2]],
    [[3, 2], [4, 5]]
  ]
*/

// Number转Excel坐标
// 0 -> A  36 -> AK  100 -> CW
function numToABC(num, str = '') {
  let a = num % 26
  let b = Math.floor(num / 26) - 1
  str = String.fromCharCode(a + 65) + str
  if (b === -1) return str
  return numToABC(b, str)
}

// border 生成样式数据
function getBorderMap(border) {
  let borderMap = {}
  const BORDER_STYLE = 'thin'
  const BORDER_COLOR = '00000000'
  if (
    border instanceof Array &&
    border[0] instanceof Array &&
    !(border[0][0] instanceof Array)
  ) {
    border = [border]
  }
  border.forEach(item => {
    // 调整数据格式一致
    if (item instanceof Array) {
      item = {
        range: item,
        style: BORDER_STYLE,
        color: BORDER_COLOR
      }
    }
    item.style = item.style ? item.style : BORDER_STYLE
    item.color = item.color ? item.color : BORDER_COLOR
    item.range = item.range[0][0] instanceof Array ? item.range : [item.range]

    let borderStyle = {
      style: item.style,
      color: { argb: item.color }
    }
    item.range.forEach(cell => {
      let [[x1, y1], [x2, y2]] = cell
      for (let i = x1; i <= x2; i++) {
        for (let j = y1; j <= y2; j++) {
          let obj = {}
          if (i === x1) obj.top = borderStyle
          if (i === x2) obj.bottom = borderStyle
          if (j === y1) obj.left = borderStyle
          if (j === y2) obj.right = borderStyle
          borderMap[`${i}|${j}`] = obj
        }
      }
    })
  })
  return borderMap
}

export function exportJSONToExcel({
  data, // [[cell, ...], [...]]
  name = Date.now(),
  bold = [], // 加粗 [[x, y], ...]
  merge = [], // 合并单元格 [[[x1, y1], [x2, y2]]]
  border = [] // 边框 [[[x1, y1], [x2, y2]]]
}) {
  let workbook = new Excel.Workbook()
  workbook.creator = 'XHC'
  let sheet = workbook.addWorksheet('sheet-1')
  // 添加纯数据
  sheet.addRows(data)
  // 边框样式
  let borderMap = getBorderMap(border)
  // 合并
  let mergeContent = []
  merge.forEach(arr => {
    mergeContent.push(arr[0])
    sheet.mergeCells(`${numToABC(arr[0][1])}${arr[0][0] + 1}:${numToABC(arr[1][1])}${arr[1][0] + 1}`)
  })
  mergeContent = mergeContent.map(item => item.join('|'))

  // 加粗
  bold = bold.map(item => item.join('|'))

  // 单元格样式处理
  data.forEach((rowData, r) => {
    let row = sheet.getRow(r + 1)
    rowData.forEach((cellData, c) => {
      let cell = row.getCell(c + 1)
      let rc = `${r}|${c}`
      // 边框
      let borderItem = borderMap[rc]
      if (borderItem) {
        cell.border = borderItem
      }
      // 加粗
      if (bold.length) {
        let i = bold.findIndex(boldItem => boldItem === rc)
        if (i >= 0) {
          cell.font = {
            bold: true
          }
          bold.splice(i, 1)
        }
      }
      // 水平垂直居中
      if (mergeContent.length) {
        let i = mergeContent.findIndex(mergeItem => mergeItem === rc)
        if (i >= 0) {
          cell.alignment = {
            vertical: 'middle',
            horizontal: 'center'
          }
        }
      }
    })
  })

  workbook.xlsx.writeBuffer()
    .then(buffer => {
      saveAs(new Blob([buffer]), `${name}.xlsx`)
    })
}
