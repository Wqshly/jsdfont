// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
import './assets/icon/iconfont.css'
// import Vuex from 'vuex'
import api from '@/request/api/index'
import commonsMethod from '@/commons/index'
import AMap from 'vue-amap'
import VueCropper from 'vue-cropper'

Vue.use(VueCropper)

Vue.use(ElementUI)
Vue.use(AMap)
AMap.initAMapApiLoader({
  key: '60a73d9fa5e15fd8b7c34291807f7569',
  plugin: ['Autocomplete', 'PlaceSearch', 'Scale', 'OverView', 'ToolBar', 'MapType', 'PolyEditor', 'AMap.CircleEditor', 'AMap.Geolocation'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
})
// Vue.use(Vuex)

// 全局注册
Vue.prototype.$axios = axios
Vue.prototype.$api = api
Vue.prototype.$commonsMethod = commonsMethod

Vue.config.productionTip = false

// 全局变量定义
global.base_url = 'http://localhost:8080/jsd_war_exploded/'

// 使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
  const role = sessionStorage.getItem('save_username')
  if (!role && to.path !== '/login' && to.path !== '/register' && to.path !== '/initRegister' && to.path !== '/test') {
    next('/login')
  } else if (to.meta.permission) {
    // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
    role === 'admin' ? next() : next('/403')
  } else {
    // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
    if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
      Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
        confirmButtonText: '确定'
      })
    } else {
      next()
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
