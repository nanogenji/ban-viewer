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
import md5 from 'js-md5';
import { VueJsonp  } from 'vue-jsonp'
import './assets/css/element-variables.scss'
Vue.use(VueHammer)
Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(VueRouter)
Vue.use(storage);
Vue.use(VueJsonp)
moment.locale('en');
Vue.prototype.$moment = moment;
Vue.prototype.$md5 = md5;

// Vue.directive("leavehide", {
//   bind(el, bindings, vnode) {
//     document.onclick = function (event) {
//       console.log(event.currentTarget.previousElementSibling)
//       if (el !== event.target || el !== event.currentTarget.previousElementSibling.innerHTML) {//判断当前触发事件的源头，是否是当前指令所在的元素
//         el.style.display = "none"//只要是就给它设置display:none让它隐藏
//       }
//     }
//   }
// })
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
