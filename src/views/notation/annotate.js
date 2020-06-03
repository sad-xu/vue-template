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
    this.el = el
    this.config = config
    this.resizeObserver = null
    // 是否正在调整尺寸 resize 事件节流标志
    this.isResizing = false

    this.attach()
  }

  attach() {
    ensureKeyframes()
    // 创建具有指定的命名空间URI和限定名称的元素
    // http://zhangwenli.com/blog/2017/07/26/createelementns/
    // 命名空间的作用：XML可包含多个软件模块，不同的模块可能存在标签名的复用，同名的标签在不同模块中有不同的表现
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
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
    this.attachListener()
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
}

export default Annotate
