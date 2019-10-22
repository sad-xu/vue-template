import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

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
  MessageBox,
  Message,
  Notification
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
  // Loading
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

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

// Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
// Vue.prototype.$alert = MessageBox.alert
// Vue.prototype.$confirm = MessageBox.confirm
// Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message

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
