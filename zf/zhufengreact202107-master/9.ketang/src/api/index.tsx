import axios,{AxiosRequestConfig} from 'axios';
//设置基本URL地址
axios.defaults.baseURL = 'http://ketang.zhufengpeixun.com';
//axios.defaults.baseURL = 'http://localhost:9898';
//设置post请求头
axios.defaults.headers.post['Content-Type']='application/json;charset=UTF-8';
//在每次发请求的的时候 ，都要把token发回服务器
axios.interceptors.request.use((config:AxiosRequestConfig)=>{
    let access_token = sessionStorage.getItem('access_token');
    if(access_token){
        config.headers={
            Authorization:`Bearer ${access_token}`
        }
    }
    return config;
},error=>Promise.reject(error));
axios.interceptors.response.use((res)=>res.data,
(error)=>Promise.reject(error));
export default axios;