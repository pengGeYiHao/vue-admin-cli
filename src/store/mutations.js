import * as types from './mutation-types'

const mutations = {
  [types.ADD_USER_INFO] (state, newUserInfo) {
    state.userInfo = newUserInfo
  },
  [types.DEL_USER_INFO] (state) {
    state.userInfo = {}
  },
  [types.SHOW_NAV_MENU] (state) {
    state.navMenuIsActive = true
  },
  [types.HIDE_NAV_MENU] (state) {
    state.navMenuIsActive = false
  }
}

export default mutations
