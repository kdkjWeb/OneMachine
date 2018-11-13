import Vue from 'vue'
import Router from 'vue-router'

//引入所有路由文件
import routes from './routes.js'

import store from './../store/index'

Vue.use(Router)
export default new Router(routes)


// 页面刷新时，重新赋值token
if (window.sessionStorage.getItem('token')) {
  store.commit('setToken', window.sessionStorage.getItem('token'))
}
