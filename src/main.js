import Vue from 'vue'

import 'normalize.css/normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss'

import '@/icons'
import '@/permission'

import App from './App'
import store from './store'
import router from './router'

import SvgIcon from './components/SvgIcon.vue'

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
  // MessageBox,
  // Message,
  // Notification
  // MenuItemGroup,
  // Pagination,
  // Autocomplete,
  // InputNumber,
  // Radio,
  // RadioGroup,
  // RadioButton,
  // Checkbox,
  // CheckboxButton,
  // CheckboxGroup,
  // Switch,
  // Select,
  // Option,
  // OptionGroup,
  // ButtonGroup,
  // Table,
  // TableColumn,
  // DatePicker,
  // TimeSelect,
  // TimePicker,
  // Popover,
  // Tooltip,
  // Form,
  // FormItem,
  // Tabs,
  // TabPane,
  // Tag,
  // Tree,
  // Alert,
  // Slider,
  // Icon,
  // Row,
  // Col,
  // Upload,
  // Progress,
  // Spinner,
  // Badge,
  // Card,
  // Rate,
  // Steps,
  // Step,
  // Carousel,
  // CarouselItem,
  // Collapse,
  // CollapseItem,
  // Cascader,
  // ColorPicker,
  // Transfer,
  // Container,
  // Header,
  // Aside,
  // Main,
  // Footer,
  // Timeline,
  // TimelineItem,
  // Link,
  // Divider,
  // Image,
  // Calendar,
  // Backtop,
  // PageHeader,
  // CascaderPanel,
} from 'element-ui'

Vue.component('svg-icon', SvgIcon)

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

// loading
// 1. 声明式，组件局部加载 v-loading
// 2. 命令式，$showLoading $hideLoading 最短显隐间隔1s
const { directive: loadingDirective, service: loadingService } = Loading
Vue.use(loadingDirective);
(function() {
  let t = 0
  const LIMIT_TIME = 1000
  Vue.prototype.$showLoading = (option = {
    text: '加载中...',
    background: 'rgba(242,242,242,0.5)',
    lock: true
  }) => {
    t = new Date().getTime()
    loadingService(option)
  }

  Vue.prototype.$hideLoading = () => {
    let _t = new Date().getTime() - t
    if (_t < LIMIT_TIME) {
      setTimeout(() => {
        loadingService().close()
      }, LIMIT_TIME)
    } else loadingService().close()
  }
}())

// Vue.prototype.$msgbox = MessageBox
// Vue.prototype.$alert = MessageBox.alert
// Vue.prototype.$confirm = MessageBox.confirm
// Vue.prototype.$prompt = MessageBox.prompt
// Vue.prototype.$notify = Notification
// Vue.prototype.$message = Message

const IS_DEV = process.env.NODE_ENV !== 'production'
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
