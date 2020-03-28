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
    component: () => import('@/views/login/Login.vue'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'Home',
      component: () => import('@/views/home/Home.vue'),
      meta: {
        title: 'Home',
        icon: 'dashboard'
      }
    }]
  },
  {
    path: '/css',
    component: () => import('@/views/cssStage/CssStage.vue'),
    meta: {
      title: 'css-stage',
      icon: 'dashboard'
    }
  }
]

const asyncRoutes = [
  {
    path: '/example',
    component: Layout,
    redirect: '/example/export-test',
    name: 'Example',
    meta: {
      title: 'example',
      icon: 'nested'
    },
    children: [
      {
        path: 'export-test',
        name: 'ExportTest',
        meta: {
          title: 'ExampleTest',
          cache: true
        },
        component: () => import('@/views/example/exportTest/ExportTest.vue')
      },
      {
        path: 'real-preview',
        name: 'RealPreview',
        meta: {
          title: 'RealPreview',
          permissions: 'SHOW_EXAMPLE_3'
        },
        component: () => import('@/views/example/realPreview/RealPreview.vue')
      },
      {
        path: 'ez-input',
        meta: {
          title: 'ezInput'
        },
        component: () => import('@/views/example/ezInput/InputTest.vue')
      },
      {
        path: 'table',
        name: 'Table',
        meta: {
          title: 'Table'
        },
        component: () => import('@/views/example/table/Table.vue')
      }
    ]
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
