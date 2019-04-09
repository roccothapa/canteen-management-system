import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  plugins: [
    createPersistedState()
  ],
  state: {
    token: null,
    user: null,
    config: null,
    authenticated: false
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      state.authenticated = !!token
    },
    setUser (state, user) {
      state.user = user
    },
    setConfig (state, config) {
      state.config = config
    }
  },
  actions: {
    setToken ({ commit }, token) {
      commit('setToken', token)
    },
    setUser ({ commit }, user) {
      commit('setUser', user)
    },
    setConfig ({ commit }, config) {
      commit('setConfig', config)
    }
  }
})
