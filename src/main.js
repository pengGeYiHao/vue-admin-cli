// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import { sync } from 'vuex-router-sync'
import ElementUI from 'element-ui'
import draggable from 'vuedraggable'
import ViserVue from 'viser-vue'
import VueQuillEditor from 'vue-quill-editor/dist/ssr'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'


import 'element-ui/lib/theme-chalk/index.css';

import '../theme/index.css'

import App from './App'
import router from './router'


import store from './store/index.js'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(VueResource)
Vue.use(ElementUI)
Vue.use(ViserVue)
Vue.use(VueQuillEditor)
Vue.component('el-draggable', draggable)

Vue.http.interceptors.push(function (request,next){
  // request.headers.set('Content-Type','Access-Control-Allow-Origin')
  // request.headers.set('Access-Control-Allow-Origin','*')
  // console.log(request)
  // next()
  let timeout;
  timeout = setTimeout(() => {
    //自定义响应体 status:408,statustext:"请求超时"，并返回给下下边的next
    next(request.respondWith(request.body, {
      status: 408,
      statusText: '请求超时'
    }));

  }, 5000);
  next((response) => {
    console.log(response)//如果超时输出408
    return response;
  })
})

sync(store.store,router)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store: store.store,
  watch: {
    '$route': 'checkLogin'
  },
  methods: {
    checkLogin () {}
  }
})
