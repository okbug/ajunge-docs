import axios from 'axios';
import { Dialog } from 'vant'
import router from '../router/index'
import store from '../store/index'
// console.log()
var instance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'http://backend-api-01.newbee.ltd' : '',
  timeout: 2000,
  // headers: { token: localStorage.getItem('newbeetoken') || '' }
  headers: { token: store && store.state.token }
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // console.log(store.state.token, config)
  // config.headers.token = store.state.token
  config.headers.token = localStorage.getItem('newbeetoken') || ''
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  let data = response.data
  if (data.resultCode == 416) {
    // 证明需要登录
    Dialog.alert({
      title: '提示',
      message: '请登录',
      theme: 'round-button',
    }).then(() => {
      router.push('/login')
    })
  } else if (data.resultCode == 500) {
    Dialog.alert({
      title: '提示',
      message: data.message,
      theme: 'round-button',
    })
  }

  return data;
}, function (error) {
  // 对响应错误做点什么
  Dialog.alert({
    title: '提示',
    message: '系统繁忙',
    theme: 'round-button',
  })
  return Promise.reject(error);
});

export default instance