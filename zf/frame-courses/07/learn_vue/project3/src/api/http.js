import axios from 'axios';
import router from '@/router'
import { MessageBox, Message } from 'element-ui';
// 创建实例时设置配置的默认值
let str = localStorage.getItem('qqquserinfo')
let userInfo = str ? JSON.parse(str) : {};
let http = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '/' : 'https://baidu.com',
  headers: {
    'qqqq': 'foobar',
    token: userInfo.userToken || ''
  },// 请求头设置
});
// 实例http的用法等同于  axios


// 添加请求拦截器
http.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 一般哦你过来做一些所有接口都要使用的共用行为
  // console.log(config)
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
http.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // response.data  才是后台返回给我们的对象
  let { data } = response;
  let { code } = data;// code 0 陈工 ； 1:未登录， 2：未注册， 3：登录过期， 4：系统繁忙 
  switch (code) {
    case 0:
      return data
    case 1:
    case 3:
      MessageBox.confirm('未登录或者登录过期，是否重新登陆?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        router.push('/login')
      }).catch(() => { })

      return;
    case 2:
      router.push('/reg')
      return;
    case 4:
      Message.error({ message: '系统繁忙', duration: 1000 });
    default:
      break;
  }
  return data;
}, function (error) {
  // 对响应错误做点什么
  Message.error({ message: '系统繁忙', duration: 1000 });
  return Promise.reject(error);
});
let ary = [];//所有的请求接口
// 每一次请求 都把对应的接口放置到这个数组中  当请求完成之后再去移除这个接口
// 下一次用一个接口过来请求的时候  先判断 数组中是否有这个接口  有的话就不再发送了
function myhttp(...arg) {
  let first = arg[0];
  // if(typeof first === 'string'){
  //   ary.push(first)
  // }else if(typeof first === 'object'){
  //   ary.push(first.url)
  // }
  if (typeof first === 'string') {
    first = first + 'get'
  } else if (typeof first === 'object') {
    first = first.url + first.method.toLowerCase()
  }

  if (ary.includes(first)) {
    // 证明上一次的这个接口 还没有请求
    return Promise.reject('重复请求')
  } else {
    ary.push(first)
  }
  let p = http(...arg);
  p.finally(() => {
    let n = ary.indexOf(first);
    ary.splice(n, 1)
  })
  return p

}
myhttp.get = function (...arg) {
  let first = arg[0] + 'get';
  if (ary.includes(first)) {
    return Promise.reject('重复请求')
  } else {
    ary.push(first)
  }
  let p = http.get(...arg);
  p.finally(() => {
    let n = ary.indexOf(first);
    ary.splice(n, 1)
  })
  return p
}
myhttp.post = function (...arg) {
  let first = arg[0] + 'post';
  if (ary.includes(first)) {
    return Promise.reject('重复请求')
  } else {
    ary.push(first)
  }
  let p = http.post(...arg);
  p.finally(() => {
    let n = ary.indexOf(first);
    ary.splice(n, 1)
  })
  return p
}

export default myhttp;
// myhttp.get('/A').then()
// myhttp.get('/A').then()  理想状态应该是 返回上一次的请求Promise实例
// myhttp.get('/B')