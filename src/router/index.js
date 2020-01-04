import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout/Layout.vue'

import { hasPermission } from '@/utils/filter'

Vue.use(Router)

/**
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    // breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    // activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
    cache: false                 app-main --> keepalive
    permissions: [String]                权限名列表
  }
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
    redirect: '/example/example1',
    name: 'Example',
    meta: {
      title: 'example',
      icon: 'nested'
    },
    children: [
      {
        path: 'example1',
        name: 'Example1',
        meta: {
          title: 'Example1',
          cache: true
        },
        component: () => import('@/views/example/Example1.vue')
      },
      {
        path: 'example2',
        name: 'Example2',
        meta: {
          title: 'Example2',
          permissions: 'SHOW_EXAMPLE_3'
        },
        component: () => import('@/views/example/Example2.vue')
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
    if (route.meta.permissions) {
      // 父
      if (hasPermission(route.meta.permissions, userLevel)) {
        acc.push(route)
      }
    } else {
      if (route.children) {
        // 子
        let children = route.children
        for (let i = 0; i < children.length; i++) {
          let permissions = children[i].meta.permissions
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
