import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import VModal from 'vue-js-modal'
import moment from 'moment'
import VueMoment from 'vue-moment'
import VueNumerals from 'vue-numerals';
import numeral from 'numeral'


if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false;

Vue.use(VModal);
Vue.use(VueMoment,{moment});
Vue.use(VueNumerals, {
    locale: 'fr'
});

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
