const state = {
  sidebar: {
    opened: localStorage.getItem('sidebarStatus') ? !!+localStorage.getItem('sidebarStatus') : true
  }
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    if (state.sidebar.opened) {
      localStorage.setItem('sidebarStatus', 1)
    } else {
      localStorage.setItem('sidebarStatus', 0)
    }
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
