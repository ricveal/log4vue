import Vue from 'vue';
import App from './app';
import log4vue from './lib';

Vue.use(log4vue);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
});
