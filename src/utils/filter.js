import store from '@/store'

const PERMISSION_MAP = {
  // 导出pdf
  EXPORT_PDF: 0,
  // 导出图片
  EXPORT_IMG: 1,
  // 导出excel
  EXPORT_EXCEL: 2,
  // example页面 3
  SHOW_EXAMPLE_3: 3
}

function check(name, level) {
  let num = Math.pow(2, PERMISSION_MAP[name])
  return (num & level) === num
}

// 是否拥有指定权限名对应的权限
export function hasPermission(permissionName, userLevel = store.getters.userLevel) {
  if (typeof permissionName === 'string') {
    return check(permissionName, userLevel)
  } else if (permissionName instanceof Array) {
    return permissionName.every(name => check(name, userLevel))
  }
}

// 权限比对 level是否满足permission所需权限
// export function checkPermission(userLevel, permission) {
//   return (permission & userLevel) === permission
// }
