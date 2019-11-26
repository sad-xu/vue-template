import ElTableInfiniteScroll from './ElTableInfiniteScroll'

ElTableInfiniteScroll.install = function(Vue) {
  Vue.directive('el-table-infinite-scroll', ElTableInfiniteScroll)
}

export default ElTableInfiniteScroll
