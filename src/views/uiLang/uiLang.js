const delimiter = 'clicking on'

function uiLang({
  el = document,
  code
}) {
  let codeBlockContent = code.trim()
  if (!codeBlockContent) return

  codeBlockContent.split(delimiter).forEach(text => {
    if (!text) return
    let {
      clickSelector, classBehavior,
      classValue, targetSelector
    } = parseInstruction(text.trim())
    console.log(text)
    console.log(clickSelector, classBehavior, classValue, targetSelector)
    //
    let clickElArr = el.querySelectorAll(clickSelector)
    let i = clickElArr.length
    if (i === 0) throw new Error(`There's no element matching your "${this.clickSelector}" CSS selector.`)

    while (i--) {
      clickElArr[i].addEventListener('click', clickCallback(el, targetSelector, classBehavior, classValue))
    }
  })
}

// 指令解析
function parseInstruction(instruction) {
  let separator = instruction[0]
  let instructionSplit = instruction.split(separator)
  return {
    clickSelector: instructionSplit[1],
    classBehavior: instructionSplit[2].trim().split(' ')[0],
    classValue: instructionSplit[3],
    targetSelector: instructionSplit[5]
  }
}

// 点击事件处理
function clickCallback(el, targetSelector, classBehavior, classValue) {
  console.log(el)
  return function(e) {
    switch (targetSelector) {
      case 'target':
      case 'this':
      case 'it':
      case 'itself':
      case undefined:
        e.target.classList[classBehavior](classValue)
        break
      default:
        let target = el.querySelectorAll(targetSelector)
        let i = target.length
        console.log(target)
        while (i--) {
          target[i].classList[classBehavior](classValue)
        }
    }
  }
}

export default uiLang
