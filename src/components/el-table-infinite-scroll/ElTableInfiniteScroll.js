/**
 * el-table 无限滚动
 *
 */
import elInfiniteScroll from 'element-ui/lib/infinite-scroll'

const elInserted = elInfiniteScroll.inserted
const elUnbind = elInfiniteScroll.unbind
const elScope = 'ELInfiniteScroll'

export default {
  inserted(el, binding, ...params) {
    const scrollElem = el.querySelector('.el-table__body-wrapper')
    scrollElem.style.overflowY = 'auto'

    setTimeout(() => {
      if (!scrollElem.style.height) {
        scrollElem.style.height = '400px'
      }

      const delay = el.getAttribute('infinite-scroll-delay')
      if (delay) scrollElem.setAttribute('infinite-scroll-delay', delay)

      const distance = el.getAttribute('infinite-scroll-distance') || 1
      if (distance) scrollElem.setAttribute('infinite-scroll-distance', distance)

      const immediate = el.getAttribute('infinite-scroll-immediate')
      if (!immediate) scrollElem.setAttribute('infinite-scroll-immediate', false)

      // 绑定 infinite-scroll
      elInserted(scrollElem, binding, ...params)
      el[elScope] = scrollElem[elScope]
    }, 0)
  },
  // fix: #1 Cannot read property 'container' of undefined
  unbind: function(el) {
    elUnbind(el.querySelector('.el-table__body-wrapper'))
  }
}
