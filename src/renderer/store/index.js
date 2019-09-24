export const strict = false;

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
    screenState: 'config',
    currentblock: 0,
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
    ac_dcurrency: "$",
    editTokenHash: 0,
    tokenList: 0,
    allAccounts: '',
    userAccounts: '',
    watchAccounts: '',
    addresseshash: '',
    gexpLogs: '',
  },
  mutations: {
    increment (state) {
      state.count++
    },
    pushCount (state, newval) {
      state.count = newval;
    },
    pushCurentblock (state, newval) {
      state.currentblock = newval;
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
    pushPeerCount (state, peercount) {
      state.peerCount = peercount;
    },
    pushCurrencies (state, curre) {
      state.currencies = curre;
    },
    pushTotalBalance (state, totalbalance) {
      state.total_balance = totalbalance;
    },
    pushAccTab (state, accounttab) {
      state.accountTab = accounttab;
    },
    pushActokens (state, actokens) {
      state.ac_tokens = actokens;
    },
    pushAcbalance (state, acbalance) {
      state.ac_balance = acbalance;
    },
    pushAcprice (state, acprice) {
      state.ac_price = acprice;
    },
    pushEditTokenHash (state, edittokenhash) {
      state.editTokenHash = edittokenhash;
    },
    pushTokenList (state, tokenlist) {
      state.tokenList = Object.assign({}, tokenlist);
    },
    pushAcdcurrency (state, acdcurrency) {
      state.ac_dcurrency = acdcurrency;
    },
    pushAllAccounts (state, allaccounts) {
      state.allAccounts = allaccounts;
    },
    pushWatchAccounts (state, watchaccounts) {
      state.watchAccounts = watchaccounts;
    },
    pushuseraccounts (state, useraccounts) {
      state.userAccounts = useraccounts;
    },
    pushAddreshash (state, addreshash) {
      state.addresseshash = addreshash;
    },
    pushGexpLogs (state, gexplogs) {
      state.gexpLogs = gexplogs;
    }
  },
  actions: {
      addCount ({ commit }, count) {
          store.commit('pushCount',count)
      },
      addCurentblock ({ commit }, currentblock) {
          store.commit('pushCurentblock',currentblock)
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
      },
      addEditTokenHash ({ commit }, editTokenHash) {
          store.commit('pushEditTokenHash',editTokenHash)
      },
      addTokenList ({ commit }, tokenList) {
          store.commit('pushTokenList',tokenList)
      },
      addpushAcdcurrency ({ commit }, ac_dcurrency) {
          store.commit('pushAcdcurrency',ac_dcurrency)
      },
      addAllAccounts ({ commit }, allAccounts) {
          store.commit('pushAllAccounts',allAccounts)
      },
      addWatchAccounts ({ commit }, watchAccounts) {
          store.commit('pushWatchAccounts',watchAccounts)
      },
      addAddreshash ({ commit }, addresseshash) {
          store.commit('pushAddreshash',addresseshash)
      },
      addUserAcc ({ commit }, userAccounts) {
          store.commit('pushuseraccounts',userAccounts)
      },
      addGexpLog({ commit }, gexpLogs) {
          store.commit('pushGexpLogs',gexpLogs)
      }
    },
    getters: {
        getGexpres: state => {
            return state.gexpRes;
        },
        getGexpSync: state => {
            return state.gexpSync;
        },
        getTokenList: state => {
            return state.tokenList;
        },
        getPrice: state => {
            return state.ac_price;
        },
        getDcurrency: state => {
            return state.ac_dcurrency;
        },
        getAllAccounts: state => {
            return state.allAccounts;
        },
        getWatchAccounts: state => {
            return state.watchAccounts;
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
