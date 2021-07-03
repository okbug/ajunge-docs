import axios from 'axios'
import { Modal } from 'antd-mobile';

const alert = Modal.alert;

let http = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '/' : 'HTTPS:BAIDU.COM',
  headers: {
    'X-Custom-Header': 'foobar',
    "Content-Type": "application/x-www-form-urlencoded",
    "token": "we4taertwrgxdfgsdf345egsdrtw456g"
  }
})
// 添加请求拦截器
http.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  console.log(config)
  // let data = typeof config.data === 'object' ? JSON.parse(config.data || "{}") : config.data
  // console.log(config.data)
  let str = '';
  Object.keys(config.data).forEach(item => {
    str += `${item}=${config.data[item]}&`
  })
  str += `token=234fda4w5adfgaser`
  config.data = str.replace(/&$/, '');
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
http.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if (response.data.code != 0) {
    alert('警告', '请求失败', [{
      text: '关闭',
      // onPress: value => new Promise((resolve) => {
      //   Toast.info('onPress promise resolve', 1);
      //   setTimeout(() => {
      //     resolve();
      //     console.log(`value:${value}`);
      //   }, 1000);
      // }),
    }])
  }
  return response.data;
}, function (error) {
  // 对响应错误做点什么

  alert('警告', '系统繁忙', [{ text: '关闭' }])
  return Promise.reject(error);
});

export default http






