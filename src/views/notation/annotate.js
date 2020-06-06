const SVG_NS = 'http://www.w3.org/2000/svg'

let keyframeStyle = null

// 添加全局 keyframes
function ensureKeyframes() {
  if (!keyframeStyle) {
    const style = document.createElement('style')
    style.textContent = `
      @keyframes rough-notation-dash {
        to {
          stroke-dashoffset: 0;
        }
      }
    `
    document.head.appendChild(style)
    keyframeStyle = style
  }
}

class Annotate {
  constructor(el, config = {}) {
    // 目标dom
    this.el = el
    // 生成的svg
    this.svg = null
    // 用户配置
    this.config = config
    // 监听实例方法
    this.resizeObserver = null
    // 当前状态 unattached | not-showing | showing
    this.status = 'unattached'
    // 是否正在调整尺寸 resize 事件节流标志
    this.isResizing = false
    // 添加keyframes + 创建svg + 监听窗口resize事件 + 监听自身
    this.attach()
  }

  // 添加keyframes + 创建svg
  attach() {
    if (this.status === 'unattached') {
      ensureKeyframes()
      // 创建具有指定的命名空间URI和限定名称的元素
      // http://zhangwenli.com/blog/2017/07/26/createelementns/
      // 命名空间的作用：XML可包含多个软件模块，不同的模块可能存在标签名的复用，同名的标签在不同模块中有不同的表现
      const svg = document.createElementNS(SVG_NS, 'svg')
      const style = svg.style
      style.position = 'absolute'
      style.top = '0'
      style.left = '0'
      style.overflow = 'visible'
      style.pointerEvents = 'none'
      style.width = '100px'
      style.height = '100px'
      // 将 svg 插入到该元素后面 afterend || beforebegin
      this.el.insertAdjacentElement('afterend', svg)
      this.svg = svg
      this.status = 'not-showing'
      this.attachListener()
    }
  }

  resizeListener() {
    if (this.isResizing) return
    this.isResizing = true
    setTimeout(() => {
      this.isResizing = false
      // TODO: computeSize()  show()
    }, 300)
  }

  detachListener() {
    window.removeEventListener('resize', this.resizeListener())
    if (this.resizeObserver) {
      // 结束观察
      this.resizeObserver.unobserve(this.$el)
    }
  }

  // 监听窗口resize事件 + 监听自身
  attachListener() {
    this.detachListener()
    // 窗口尺寸变化处理
    // passive: true  表示不会调用preventDefault；若调用，警告
    // 目的：使操作更流畅 TODO: 待验证
    // 场景：移动端滚动，有一个 ≈ 200ms 的停顿，浏览器不知道我们是否要preventDefault，所以需要一个延迟来检测。导致滑动显得比较卡顿
    //      已知的优化：Chrome 中，若绑定了touchmove或者touchstart，passive默认为true
    window.addEventListener('resize', this.resizeListener(), { passive: true })
    // 自身节点变化处理
    if (!this.resizeObserver) {
      // 创建监听实例
      this.resizeObserver = new window.ResizeObserver(entries => {
        for (const entry of entries) {
          console.log(entry.contentRect) // 尺寸信息
          // TODO:
        }
      })
    }
    this.resizeObserver.observe(this.el)
  }

  show() {
    switch (this.status) {
      case 'unattached':
        break
      case 'not-showing':
        this.attach()
        this.render()
        break
      case 'showing':
        this.hide()
        this.show()
        break
    }
  }

  // 清空子节点
  hide() {
    let svg = this.svg
    while (svg.lastChild) {
      svg.removeChild(svg.lastChild)
    }
    this.status = 'not-showing'
  }

  // 渲染
  render() {
    let elRect = this.el.getBoundingClientRect()
    let svgRect = this.svg.getBoundingClientRect()
    let rect = {
      x: elRect.left - svgRect.left,
      y: elRect.top - svgRect.top,
      w: elRect.width,
      h: elRect.height
    }
    // TODO: draw svg,rect,config
    renderAnnotation(this.svg, rect, this.config)
    this.status = 'showing'
  }
}

// 渲染真实 svg
function renderAnnotation(svg, rect, config) {
  const opList = []
  let strokeWidth = 2
  let padding = [5, 5, 5, 5]
  let animate = true
  let iterations = 2
  // underline strike-through box
  let type = 'underline'
  // 生成类svg格式
  if (type === 'underline') {
    let y = rect.y + rect.h + padding[2]
    for (let i = 0; i < iterations; i++) {
      if (i % 2) {
        opList.push(line(rect.x + rect.w, y, rect.x, y))
      } else {
        opList.push(line(rect.x, y, rect.x + rect.w, y))
      }
    }
  }
  if (opList.length) {
    // 转换为真实svg数据
    const pathString = opsToPath(opList)
    let lengths = []
    let totalLength = 0
    let pathElements = []
    for (const d of pathString) {
      const path = document.createElementNS(SVG_NS, 'path')
      path.setAttribute('d', d)
      path.setAttribute('fill', 'none')
      path.setAttribute('stroke', 'currentColor')
      path.setAttribute('stroke-width', strokeWidth)
      if (animate) {
        const length = path.getTotalLength()
        lengths.push(length)
        totalLength += length
      }
      svg.appendChild(path)
      pathElements.push(path)
    }
    // 动画处理
    if (animate) {
      let durationOffset = 0
      for (let i = 0; i < pathElements.length; i++) {
        const path = pathElements[i]
        const length = lengths[i]
        const duration = totalLength ? (1000 * (length / totalLength)) : 0
        const delay = 0 + durationOffset
        const style = path.style
        style.strokeDashoffset = `${length}`
        style.strokeDasharray = `${length}`
        style.animation = `rough-notation-dash ${duration}ms ease-out ${delay}ms forwards`
        durationOffset += duration
      }
    }
  }
}

function line(x1, y1, x2, y2) {
  return {
    type: 'path',
    ops: generateLine(x1, y1, x2, y2)
  }
}

function generateLine(x1, y1, x2, y2, move = true, overlay = true) {
  const lengthSq = Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2)
  const length = Math.sqrt(lengthSq)
  let roughnessGain = 1
  const o = {
    maxRandomnessOffset: 2,
    bowing: 1,
    seed: 0,
    roughness: 1.5
  }
  if (length < 200) {
    roughnessGain = 1
  } else if (length > 500) {
    roughnessGain = 0.4
  } else {
    roughnessGain = (-0.0016668) * length + 1.233334
  }
  let offset = o.maxRandomnessOffset || 0
  if ((offset * offset * 100) > lengthSq) {
    offset = length / 10
  }
  const halfOffset = offset / 2
  const divergePoint = 0.2 // + random(o) * 0.2
  let midDispX = o.bowing * o.maxRandomnessOffset * (y2 - y1) / 200
  let midDispY = o.bowing * o.maxRandomnessOffset * (x1 - x2) / 200
  midDispX = _offsetOpt(midDispX, o, roughnessGain)
  midDispY = _offsetOpt(midDispY, o, roughnessGain)
  const ops = []
  const randomHalf = () => _offsetOpt(halfOffset, o, roughnessGain)
  const randomFull = () => _offsetOpt(offset, o, roughnessGain)
  if (move) {
    if (overlay) {
      ops.push({
        op: 'move',
        data: [
          x1 + randomHalf(),
          y1 + randomHalf()
        ]
      })
    } else {
      ops.push({
        op: 'move',
        data: [
          x1 + _offsetOpt(offset, o, roughnessGain),
          y1 + _offsetOpt(offset, o, roughnessGain)
        ]
      })
    }
  }
  if (overlay) {
    ops.push({
      op: 'bcurveTo',
      data: [
        midDispX + x1 + (x2 - x1) * divergePoint + randomHalf(),
        midDispY + y1 + (y2 - y1) * divergePoint + randomHalf(),
        midDispX + x1 + 2 * (x2 - x1) * divergePoint + randomHalf(),
        midDispY + y1 + 2 * (y2 - y1) * divergePoint + randomHalf(),
        x2 + randomHalf(),
        y2 + randomHalf()
      ]
    })
  } else {
    ops.push({
      op: 'bcurveTo',
      data: [
        midDispX + x1 + (x2 - x1) * divergePoint + randomFull(),
        midDispY + y1 + (y2 - y1) * divergePoint + randomFull(),
        midDispX + x1 + 2 * (x2 - x1) * divergePoint + randomFull(),
        midDispY + y1 + 2 * (y2 - y1) * divergePoint + randomFull(),
        x2 + randomFull(),
        y2 + randomFull()
      ]
    })
  }
  return ops
}

function _offsetOpt(x, ops, roughnessGain = 1) {
  return ops.roughness * roughnessGain * ((random(ops) * (x - (-x))) - x)
}

function random(ops) {
  if (!ops.randomizer) {
    ops.randomizer = new Random(ops.seed || 0)
  }
  return ops.randomizer.next()
}

class Random {
  constructor(seed) {
    this.seed = seed
  }
  next() {
    if (this.seed) {
      return ((2 ** 31 - 1) & (this.seed = Math.imul(48271, this.seed))) / 2 ** 31
    } else return Math.random()
  }
}

function opsToPath(opList) {
  const paths = []
  for (const drawing of opList) {
    let path = ''
    for (const item of drawing.ops) {
      const data = item.data
      switch (item.op) {
        case 'move':
          if (path.trim()) {
            paths.push(path.trim())
          }
          path = `M${data[0]} ${data[1]} `
          break
        case 'bcurveTo':
          path += `C${data[0]} ${data[1]}, ${data[2]} ${data[3]}, ${data[4]} ${data[5]} `
          break
        case 'lineTo':
          path += `L${data[0]} ${data[1]} `
          break
      }
      if (path.trim()) {
        paths.push(path.trim())
      }
    }
  }
  return paths
}

export default Annotate
