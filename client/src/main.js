// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/assets/css/style.css'
import Notifications from 'vue-notification'
import { sync } from 'vuex-router-sync'
import store from '@/store/store'

Vue.config.productionTip = false

Vue.use(Notifications)
sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
