import Vue from 'vue';
import axios from 'axios';

import App from './App';
import router from './router';
import store from './store';
import VModal from 'vue-js-modal';
import moment from 'moment';
import VueMoment from 'vue-moment';
import VueNumerals from 'vue-numerals';
import numeral from 'numeral';
import VueNotification from "@kugatsu/vuenotification";
import Datetime from 'vue-datetime'
// You need a specific loader for CSS files
import 'vue-datetime/dist/vue-datetime.css'

Vue.use(Datetime)
import * as Raven from 'raven-js';
Vue.use(VueNotification, {
    timer: 20,
    position: "topRight",
});
Raven
    .config('https://204e85c8efd64965baa31c06301c0426@sentry.io/1480137')
    .install();

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false;

Vue.use(VModal);
Vue.use(VueMoment,{moment});
Vue.use(VueNumerals, {
    locale: 'en'
});

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
