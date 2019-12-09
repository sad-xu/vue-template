import store from '@/store'

const PERMISSION_MAP = {
  // 导出pdf
  EXPORT_PDF: 0,
  // 导出图片
  EXPORT_IMG: 1,
  // 导出excel
  EXPORT_EXCEL: 2
  // example页面 3
}

// 是否拥有指定权限名对应的权限
export function hasPermission(name, userLevel = store.getters.userLevel) {
  let num = Math.pow(2, PERMISSION_MAP[name])
  console.log(num, userLevel, name)
  return (num & userLevel) === num
}

// 权限比对 level是否满足permission所需权限
export function checkPermission(userLevel, permission) {
  return (permission & userLevel) === permission
}
