import Vue from 'vue';
import store from "./store";
import App from './App.vue';

Vue.config.productionTip = false;

import VueAnalytics from 'vue-analytics'
Vue.use(VueAnalytics, {
  id: 'UA-114654492-4'
});

new Vue({
  render: h => h(App),
  store
}).$mount('#app');
