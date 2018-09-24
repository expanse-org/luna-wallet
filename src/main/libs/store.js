// steal from https://github.com/vuejs/vuex/issues/92#issuecomment-212012430
import Vue from 'vue'
import Vuex from 'vuex'
import { BrowserWindow, ipcMain } from 'electron'

import modules from '../../renderer/store/modules'

Vue.use(Vuex)

const clients = []

const store = new Vuex.Store({
  modules,
  strict: process.env.NODE_ENV !== 'production'
})

store.subscribe((mutation, state) => {
  clients.forEach(client => {
    client.send('vuex-apply-mutation', mutation)
  })
})

ipcMain.on('vuex-connect', (event) => {
  let winId = BrowserWindow.fromWebContents(event.sender).id
  console.log('vuex-connect: %s', winId)

  clients[winId] = event.sender
  event.returnValue = store.state
})

ipcMain.on('vuex-mutation', (event, args) => {
  try {
    const [ type, payload ] = args
    console.log('vuex-mutation: %o\npayload: %o', type, payload)
    store.commit(...args)
  } catch (error) {
    console.log(error)
    event.sender.send('vuex-error', error)
  }
})

ipcMain.on('vuex-action', (event, args) => {
  try {
    const [ content, payload ] = args
    console.log('vuex-action: %o\npayload: %o', content, payload)
    store.dispatch(...args)
  } catch (error) {
    console.log(error)
    event.sender.send('vuex-error', error)
  }
})

global.state = store.state
global.commit = store.commit
