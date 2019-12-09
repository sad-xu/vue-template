// import {
//   // login,
//   logout
//   // getInfo
// } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  level: 0,
  // 侧边栏路由
  userRoutes: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER_INFO: (state, { name, avatar, level }) => {
    state.name = name
    state.avatar = avatar
    state.level = level
  },
  SET_LEVEL: (state, level) => {
    state.level = level
  },
  SET_USER_ROUTES: (state, routes) => {
    state.userRoutes = routes
  }
}

const actions = {
  login({ commit }, userInfo) {
    // const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      // login({ username: username.trim(), password: password }).then(response => {
      //   const { data } = response
      let token = 'aaa'
      commit('SET_TOKEN', token)
      if (userInfo.level) {
        commit('SET_LEVEL', userInfo.level)
      }
      setToken(token)
      resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // 获取用户信息
  getInfo({ commit, state }) {
    // 每次进入页面调用
    // 可在这里加入获取其他必须信息的接口
    return new Promise((resolve, reject) => {
      // getInfo(state.token).then(response => {
      //   const { data } = response
      // if (!data) {
      //   reject('Verification failed, please Login again.')
      // }
      // const { name, avatar } = data
      const level = state.level || 0b1111
      console.log(level)
      commit('SET_USER_INFO', {
        name: 'user1',
        avatar: require('@/assets/avatar.png'),
        level: level
      })
      resolve(level)
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // 设置侧边栏
  setUserRoutes({ commit }, routes) {
    commit('SET_USER_ROUTES', routes)
  },

  logout({ commit, state }) {
    commit('SET_TOKEN', '')
    removeToken()
  },

  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
