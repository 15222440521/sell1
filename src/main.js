// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import seller from './components/seller/seller'
//引入stylus文件
import "./commen/stylus/index.styl"

Vue.config.productionTip = false
//将axios绑定到Vue对象上
Vue.prototype.$axios=axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
