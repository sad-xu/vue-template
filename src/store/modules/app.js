const SIDEBAR_STATUS = 'sidebarStatus'

const state = {
  sidebar: {
    opened: localStorage.getItem(SIDEBAR_STATUS) ? !!+localStorage.getItem(SIDEBAR_STATUS) : true
  },
  cachedViews: []
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    localStorage.setItem(SIDEBAR_STATUS, state.sidebar.opened ? 1 : 0)
  },
  ADD_CACHED_VIEW: (state, view) => {
    if (state.cachedViews.includes(view.name)) return
    if (view.meta.cache) {
      state.cachedViews.push(view.name)
    }
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  addCachedView({ commit }, view) {
    commit('ADD_CACHED_VIEW', view)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
