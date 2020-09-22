import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    coboVuex ({ commit }, payload) {
      console.log('tes')
    }
  },
  modules: {
    auth
  }
})
