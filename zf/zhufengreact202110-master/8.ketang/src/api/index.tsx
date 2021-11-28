import axios from 'axios';
axios.defaults.baseURL = 'http://ketang.zhufengpeixun.com';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
/**
 * interceptor 
 * 请求拦截器  用于把用户存储的jwt token发送给服务器
 * 响应拦截器  直接返回响应体
 */
axios.interceptors.request.use((config) => {
    //如果用户登录后，服务器会返回给客户端一个jwt token,保存在access_token里，以后每次再发送请求的时候发回服务器，用来验证身份
    let access_token = sessionStorage.getItem('access_token');
    config.headers = (config.headers || {})
    config.headers['Authorization'] = `Bearer ${access_token}`
    return config;
}, error => Promise.reject(error));
//因为我们用了响应拦截器，所以得到的结果直接就是响应体
axios.interceptors.response.use(response => response.data, error => Promise.reject(error));
export default axios;