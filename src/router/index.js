import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout/Layout.vue'

import { hasPermission } from '@/utils/filter'

Vue.use(Router)

/**
 * hidden: true                   默认 false. 若为 true, 则不会在侧边栏显示
 * alwaysShow: true               默认 false. 当有子项时，默认缩回; 若为 true, 默认展开
 * redirect: noRedirect           重定向
 * name:'router-name'             <keep-alive> 时必须设置
 * meta: {
 *  title: 'title'               侧边栏的标题
 *  icon: 'svg-name'             侧边栏的图标
 *  cache: false                 是否缓存 app-main --> keepalive
 *  permissions: [String]        权限名列表
 * }
 *
 */

const constantRoutes = [
  {
    path: '/login',
    hidden: true,
    component: () => import('@/views/login/Login.vue')
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'Home',
      meta: {
        title: 'Home',
        icon: 'xianrenzhang-3'
      },
      component: () => import('@/views/home/Home.vue')
    }]
  }
]

const asyncRoutes = [
  { // CSS 动画
    path: '/',
    component: Layout,
    children: [{
      path: 'css-stage',
      name: 'CssStage',
      meta: {
        title: 'CSS Stage',
        icon: 'huolieniao'
      },
      component: () => import('@/views/cssStage/CssStage.vue')
    }]
  },
  { // animate
    path: '/',
    component: Layout,
    children: [{
      path: 'animate',
      name: 'Animate',
      meta: {
        title: 'Animate',
        icon: 'shuzhi'
      },
      component: () => import('@/views/animate/Animate.vue')
    }]
  },
  { // 真实预览
    path: '/',
    component: Layout,
    children: [{
      path: 'real-preview',
      name: 'RealPreview',
      meta: {
        title: 'Real Preview',
        icon: 'huli'
      },
      component: () => import('@/views/realPreview/RealPreview.vue')
    }]
  },
  { // SVG 图标
    path: '/',
    component: Layout,
    children: [{
      path: 'icon-list',
      name: 'IconList',
      meta: {
        title: 'Icon List',
        icon: 'niao',
        permissions: 'SHOW_ICON_LIST'
      },
      component: () => import('@/views/iconList/IconList.vue')
    }]
  },
  { // 导出测试
    path: '/',
    component: Layout,
    children: [{
      path: '/export-test',
      name: 'ExportTest',
      meta: {
        title: 'Export Test',
        icon: 'xiaolu'
      },
      component: () => import('@/views/exportTest/ExportTest.vue')
    }]
  },
  { // 表格组件
    path: '/',
    component: Layout,
    children: [{
      path: 'table',
      name: 'Table',
      meta: {
        title: 'Ez Table',
        icon: 'xueshan'
      },
      component: () => import('@/views/ezTable/TableTest.vue')
    }]
  },
  { // 输入框组件
    path: '/',
    component: Layout,
    children: [{
      path: 'ez-input',
      meta: {
        title: 'Ez Input(废弃)',
        icon: 'shuye-3',
        cache: true
      },
      component: () => import('@/views/ezInput/InputTest.vue')
    }]
  },

  {
    hidden: true,
    path: '*',
    name: '404',
    component: () => import('@/views/404'),
    meta: {
      title: '404'
    }
  }
]

const createRouter = () => new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// 根据权限生成路由
export function initRouter(userLevel) {
  let permissionRoutes = asyncRoutes.reduce((acc, route) => {
    if (route.meta && route.meta.permissions) {
      // 父
      if (hasPermission(route.meta.permissions, userLevel)) {
        acc.push(route)
      }
    } else {
      if (route.children) {
        // 子
        let children = route.children
        for (let i = 0; i < children.length; i++) {
          let permissions = children[i].meta && children[i].meta.permissions
          if (permissions && !hasPermission(permissions, userLevel)) {
            children.splice(i, 1)
            i--
          }
        }
        if (children.length) acc.push(route)
      } else {
        acc.push(route)
      }
    }
    return acc
  }, [])

  router.addRoutes(permissionRoutes)
  return constantRoutes.concat(permissionRoutes)
}

export default router
