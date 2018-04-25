import * as types from './mutation-types'

const actions = {
    addUserInfo ({commit,state}, newUserInfo) {
      commit(types.ADD_USER_INFO,newUserInfo)
    },
    delUserInfo ({commit,state}) {
      commit(types.DEL_USER_INFO)
    },
    hideNavMenu ({commit,state}) {
      commit(types.HIDE_NAV_MENU)
    },
    showNavMenu ({commit,state}) {
      commit(types.SHOW_NAV_MENU)
    },
  }

export default actions
