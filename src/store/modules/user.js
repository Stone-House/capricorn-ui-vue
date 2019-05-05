import user from '../../api/user'

const state = {
  userInfo: {},
}

const getters = {
  isAdmin(state) {
    return state.userInfo.user_type
  },
}

const actions = {
  login({ state, commit }, { name, password }) {
    return new Promise(resolve => {
      user.login(name, password).then(resp => {
        if (resp.status === 200) {
          commit('saveUserInfo', resp.data)
          resolve()
        }
      })
    })
  },

  getUserInfo({ state, commit }) {
    user.getUserInfo().then(resp => {
      if (resp.status === 200) {
      commit('saveUserInfo', resp.data.data)            
      }
    })
  }
}

const mutations = {
  saveUserInfo(state, userInfo) {
    state.userInfo = userInfo
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
