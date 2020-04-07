const getters = {
  sidebar: state => state.app.sidebar,
  screenshotTime: state => state.app.screenshotTime,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  userRoutes: state => state.user.userRoutes,
  userLevel: state => state.user.level
}
export default getters
