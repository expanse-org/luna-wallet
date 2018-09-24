import Vue from 'vue'
import Vuex from 'vuex'
import debug from 'debug'
import { ipcRenderer } from 'electron'
import modules from './modules'
import {activeScreen} from '../../main/libs/config'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0,
    screenState: activeScreen,
    gexpRes: false,
  },
  mutations: {
    increment (state) {
      state.count++
    },
    pushCount (state, newval) {
      state.count = newval;
    },
    pushScreen (state, screen) {
      state.screenState = screen;
    },
    pushGexpres (state, gexpres) {
      state.gexpRes = gexpres;
    }
  },
  actions: {
      addCount ({ commit }, count) {
          store.commit('pushCount',count)
      },
      addScreen ({ commit }, screen) {
          store.commit('pushScreen',screen)
      },
      addGexpres ({ commit }, gexpres) {
          store.commit('pushGexpres',gexpres)
      }
    },
    getters: {
        getGexpres: state => {
            return state.gexpRes;
        },
    },
  modules,
  strict: process.env.NODE_ENV !== 'production',
})
//
// console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"
//
// ipcRenderer.on('asynchronous-reply', (event, arg) => {
//   console.log(arg) // prints "pong"
// })
// ipcRenderer.send('asynchronous-message', 'ping')


export default store
