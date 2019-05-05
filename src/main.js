import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import VueFusionCharts from 'vue-fusioncharts';
// import FusionCharts modules and resolve dependency
import FusionCharts from 'fusioncharts/core';
import Pie2D from 'fusioncharts/viz/pie2d';
import axios from './api'

import App from './App.vue';
import router from './router';
import store from './store/';


// register VueFusionCharts component
Vue.use(VueFusionCharts, FusionCharts, Pie2D);


Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
