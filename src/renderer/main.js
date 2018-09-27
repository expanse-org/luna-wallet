import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import VModal from 'vue-js-modal'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false;

Vue.use(VModal);

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
