import Vue from 'vue'
import 'normalize.css/normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss'

import '@/icons'
import '@/permission'

import App from './App'
import store from './store'
import router from './router'

import Tracker from '@/utils/tracker.js'

import * as filter from '@/utils/filter.js'

import SvgIcon from './components/svg-icon'
import ElTableInfiniteScroll from './components/el-table-infinite-scroll'

import { showLoading, hideLoading } from '@/utils'

import {
  Dialog,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  Input,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  Scrollbar,
  Loading
} from 'element-ui'

Vue.prototype.$ELEMENT = { size: 'small', zIndex: 2000 }
Vue.use(Dialog)
Vue.use(Input)
Vue.use(Button)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Scrollbar)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)

Vue.use(Loading.directive)

Vue.use(SvgIcon)
Vue.use(ElTableInfiniteScroll)

Vue.prototype.$showLoading = showLoading
Vue.prototype.$hideLoading = hideLoading

// Vue.prototype.$msgbox = MessageBox
// Vue.prototype.$alert = MessageBox.alert
// Vue.prototype.$confirm = MessageBox.confirm
// Vue.prototype.$prompt = MessageBox.prompt
// Vue.prototype.$notify = Notification
// Vue.prototype.$message = Message

// 过滤器 && 全局函数
for (let key in filter) {
  Vue.filter(key, filter[key])
  Vue.prototype[key] = filter[key]
}

const IS_DEV = process.env.NODE_ENV !== 'production'

// 埋点
let tracker = new Tracker({
  pageNumLimit: 5,
  actionNumLimit: 5,
  showHotSpots: IS_DEV,
  baseURL: '/api/batch', // () => `${IS_DEV ? '' : '/'}api/point/batch?token=${localStorage.getItem('token')}`
  directiveType: 'click',
  logToData: logList => (JSON.stringify({
    burying_id: 1,
    point_list: logList
  }))
})
tracker.init({
  Vue,
  router
})
Vue.prototype.$tracker = tracker
if (IS_DEV) {
  window.tracker = tracker
}

Vue.config.devtools = IS_DEV
Vue.config.silent = IS_DEV
Vue.config.productionTip = IS_DEV
Vue.config.errorHandler = (err, vm, info) => {
  console.log(err, info)
}
window.addEventListener('error', e => {
  console.log('window err:', e)
})
window.addEventListener('unhandledrejection', e => {
  console.log('reject', e)
})

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
