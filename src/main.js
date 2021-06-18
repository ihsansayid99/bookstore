import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import store from './stores'
import router from './router'
import './plugins/helper'

Vue.config.productionTip = false


new Vue({
  vuetify,
  render: h => h(App),
  router,
  store
}).$mount('#app')
