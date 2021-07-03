import axios from 'axios'
import { Modal, Button, Space } from 'antd';
import store from '../store/index'
var http = axios.create({
  baseURL: process.env.NODE_ENV == 'development' ? '' : 'http://backend-api-02.newbee.ltd/manage-api/v1/adminUser',
  timeout: 3000,
  headers: {}
})

// 添加请求拦截器
http.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  console.log(config)
  config.headers.token = store.getState().userInfo.token
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
http.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if (response.data.resultCode !== 200) {
    Modal.error({
      title: '系统繁忙',
      content: response.data.message,
    });
  }
  return response.data;
}, function (error) {
  // 对响应错误做点什么
  Modal.error({
    title: '系统繁忙',
    content: '系统繁忙',
  });
  return Promise.reject(error);
});

export default http;