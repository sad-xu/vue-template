import router, { initRouter } from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login'] // 白名单

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // 用户信息
          const permission = await store.dispatch('user/getInfo')
          // 按权限生成路由
          const routes = await initRouter(permission)
          console.log(routes)
          // 设置侧边栏
          await store.dispatch('user/setUserRoutes', routes)
          console.log(permission)
          // 必须
          if (from.path === '/') {
            next({ ...to, replace: true })
          } else {
            next()
          }
        } catch (error) {
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next('/login')
          NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
