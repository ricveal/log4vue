import Vue from 'vue';
import Log4Vue from 'log4vue'; // eslint-disable-line

// 1. Use plugin.
Vue.use(Log4Vue);

// 2. Create and mount root instance.
new Vue({
  template: `
  <div id="app">
    <h1>log4vue</h1>
  </div>
  `,
  mounted() {
    this.$log('hola');
  },
}).$mount('#app');
