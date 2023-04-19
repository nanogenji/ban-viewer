import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';
import moment from 'moment';
import VueRouter from 'vue-router';
import router from './router';
import 'element-ui/lib/theme-chalk/index.css';
import storage from './utils/localstorage';
import store from './store'
import { VueHammer } from 'vue2-hammer'
import './assets/css/element-variables.scss'
Vue.use(VueHammer)
Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(VueRouter)
Vue.use(storage);

moment.locale('en');
Vue.prototype.$moment = moment;
// if(localStorage.getItem('theme') === 'default'){
//   import('../src/assets/css/theme/default.scss')
// }
// else{
//   import('../src/assets/css/theme/dark.scss')
// }
new Vue({
  render: h => h(App),
  //全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  store,
  router
}).$mount('#app')
