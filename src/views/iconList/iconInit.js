// *已废弃* 通过 node 遍历icon文件名 写入iconList.vue

const fs = require('fs')
const path = require('path')

const TEST_FILE = path.join(__dirname, './IconList.vue')

let svgList = fs.readdirSync(path.join(__dirname, '../../icons/svg'))

let vueContent = fs.readFileSync(TEST_FILE, 'utf8')

vueContent = vueContent.replace(
  /\/\* xxx \*\/(.*)\/\* xxx \*\//,
  '/* xxx */' + JSON.stringify(svgList.map(path => path.replace('.svg', ''))).replace(/,/g, ', ').replace(/"/g, `'`) + '/* xxx */'
)

fs.writeFileSync(TEST_FILE, vueContent)

console.log('Init icon successfully!')
