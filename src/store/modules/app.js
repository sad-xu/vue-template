import { showLoading, hideLoading } from '@/utils'

const SIDEBAR_STATUS = 'sidebarStatus'

const state = {
  sidebar: {
    opened: localStorage.getItem(SIDEBAR_STATUS) ? !!+localStorage.getItem(SIDEBAR_STATUS) : true
  },
  cachedViews: [],
  // 截图次数 - 截取多张
  screenshotTime: 0
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    localStorage.setItem(SIDEBAR_STATUS, state.sidebar.opened ? 1 : 0)
  },
  ADD_CACHED_VIEW: (state, view) => {
    if (state.cachedViews.includes(view.name)) return
    state.cachedViews.push(view.name)
  },
  SET_SCREENSHOTTIME: state => {
    state.screenshotTime++
  }
}

let imgPromiseList = [] // 一次截图队列

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  addCachedView({ commit }, view) {
    commit('ADD_CACHED_VIEW', view)
  },
  // 开始截图
  startScreenshot({ commit }) {
    showLoading()
    imgPromiseList = []
    commit('SET_SCREENSHOTTIME')
    setTimeout(() => {
      Promise.all(imgPromiseList).then(imgList => {
        console.log(imgList)
        // 截图数据
      }).finally(() => {
        hideLoading()
        imgPromiseList = []
      })
    }, 0)
  },
  // 添加截图队列
  pushImgList({ commit }, p) {
    imgPromiseList.push(p)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
