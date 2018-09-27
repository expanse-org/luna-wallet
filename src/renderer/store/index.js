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
    gexpSync: '',
    isgexpSync: '',
    peerCount: '',
    currencies: '',
    total_balance: 0,
    accountTab: 0,
    ac_tokens: 0,
    ac_balance: 0,
    ac_price: 0,
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
    },
    pushGexpSync (state, gexpsync) {
      state.gexpSync = gexpsync;
    },
    pushIsGexpSync (state, isgexpsync) {
      state.isgexpSync = isgexpsync;
    },
    pushPeerCount (state, peerCount) {
      state.peerCount = peerCount;
    },
    pushCurrencies (state, currencies) {
      state.currencies = currencies;
    },
    pushTotalBalance (state, total_balance) {
      state.total_balance = total_balance;
    },
    pushAccTab (state, accountTab) {
      state.accountTab = accountTab;
    },
    pushActokens (state, ac_tokens) {
      state.ac_tokens = ac_tokens;
    },
    pushAcbalance (state, ac_balance) {
      state.ac_balance = ac_balance;
    },
    pushAcprice (state, ac_price) {
      state.ac_price = ac_price;
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
      },
      addGexpSync ({ commit }, gexpsync) {
          store.commit('pushGexpSync',gexpsync)
      },
      addIsGexpSync ({ commit }, isgexpsync) {
          store.commit('pushIsGexpSync',isgexpsync)
      },
      addPeerCount ({ commit }, peerCount) {
          store.commit('pushPeerCount',peerCount)
      },
      addCurrencies ({ commit }, currencies) {
          store.commit('pushCurrencies',currencies)
      },
      addTotalBalance ({ commit }, total_balance) {
          store.commit('pushTotalBalance',total_balance)
      },
      addAccTab ({ commit }, accountTab) {
          store.commit('pushAccTab',accountTab)
      },
      addActokens ({ commit }, ac_tokens) {
          store.commit('pushActokens',ac_tokens)
      },
      addAcbalance ({ commit }, ac_balance) {
          store.commit('pushAcbalance',ac_balance)
      },
      addAcprice ({ commit }, ac_price) {
          store.commit('pushAcprice',ac_price)
      }
    },
    getters: {
        getGexpres: state => {
            return state.gexpRes;
        },
        getGexpSync: state => {
            return state.gexpSync;
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
