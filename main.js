import Vue from 'vue'
import App from './App'
import store from './store/store.js'
import {
  $http
} from '@escook/request-miniprogram'

uni.$http = $http

// https://www.zhengzhicheng.cn
// https://autumnfish.cn/wx
$http.baseUrl = 'https://api-hmugo-web.itheima.net'

// 请求拦截器
$http.beforeRequest = function(options) {
  uni.showLoading({
    title: '数据加载中...'
  })
  // 判断请求的是否为有权限的 API 接口
  if (options.url.indexOf('/my/') !== -1) {
    // 为请求头添加身份认证字段
    options.header = {
      // 字段的值可以直接从 vuex 中进行获取
      Authorization: store.state.m_user.token,
    }
  }
}

// 响应拦截器
$http.afterRequest = function() {
  uni.hideLoading()
}

// 弹框
uni.$showMsg = function(title = '数据请求失败', duration = 1500) {
  uni.showToast({
    title,
    duration,
    icon: 'none'
  })
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
  store
})
app.$mount()
