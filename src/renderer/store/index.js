
import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    },
    pushCount (state, newval) {
      state.count = newval;
    }
  },
  actions: {
      addCount ({ commit }, count) {
          store.commit('pushCount',count)
      }
    },
  modules,
  strict: process.env.NODE_ENV !== 'production'
})
