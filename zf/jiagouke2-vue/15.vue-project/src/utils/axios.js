// 对axios 二次封装

import axios from 'axios';
import store from '../store/index'
// 封装的目的是封装公共的拦截器 ， 每个实例有单独自己拦截器
// 创建一个单独的实例，每次请求都使用这个方法来创建实例

import { Loading } from 'element-ui';
import * as types from '../store/action-types'
import {getLocal} from './local'

let loadingInstance;

// 当页面切换时 删除不必要的请求
class Http{
    constructor(){
        this.timeout = 3000; // 超时时间
        // 开发时和生产时采用不同的前缀发送请求
        this.baseURL = process.env.NODE_ENV == 'development'?'http://www.fullstackjavascript.cn:8888/':'/';

        this.queue = {}; // 存放所有的请求队列 /getBannerList : true
    }
    mergeOptions(options){ // 合并参数
        return {
            timeout:this.timeout,
            baseURL:this.baseURL,
            ...options
        }
    }
    setInterceptor(instance,url){
        instance.interceptors.request.use((config)=>{
            // 所有的请求都会走这轮
            // if(Object.keys(this.queue).length == 0){
            //     // 当前是所有请求中的第一个
            //     loadingInstance = Loading.service({ fullscreen: true });
            // }
            // this.queue[url] = true;
            let Cancel = axios.CancelToken
            config.cancelToken = new Cancel(function (c) {
                store.commit(types.SET_REQUEST_TOKEN,c);
            });
            // jwt 规范
            config.headers.authorization = 'Bearer ' + getLocal('token');
            return config;
        });
        instance.interceptors.response.use(res=>{
            // delete this.queue[url]; // 删除
            // if(Object.keys(this.queue).length == 0){
            //     // 当前是所有请求中的第一个
            //     loadingInstance.close();
            // }

            // 所有的响应都会走这轮
            if(res.status == 200){
                if(res.data.err == 1){
                    return Promise.reject(res.data);
                }
                return Promise.resolve(res.data.data);
            }else{
                // 401 403 .... switch-case 去判断每个状态码代表的含义
                // ...
                return Promise.reject(res);
            }
           
            return res.data
        },err=>{ // 失败直接返回失败的promoise
            // delete this.queue[url]; // 删除
            // if(Object.keys(this.queue).length == 0){
            //     // 当前是所有请求中的第一个
            //     loadingInstance.close();
            // }
            return Promise.reject(err);
        })
    }
    request(options){ // 用户的参数 + 默认参数 = 总共的参数
        const opts = this.mergeOptions(options);
        // 对请求的超时，切换取消请求  , loading
        const axiosInstance = axios.create(); // axios()
        // 添加拦截器
        this.setInterceptor(axiosInstance,opts.url);
        // 当调用axios.request 时 内部会创建一个 axios实例 并且给这个实例传入配置属性
        return axiosInstance(opts)
    }
    // 这两个方法只是对request方法 一个简写而已
    get(url,config = {}){ // params
        return this.request({
            url,
            method:'get',
            ...config
        })
    }
    post(url,data){  // data
        // 对data进行格式化
        return this.request({
            method:'post',
            url,
            data
        })
    }
}
export default new Http

