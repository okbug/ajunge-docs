# Ajax基础知识
### Async JavaScript And XML
### JavaScript中的XMLHTTPRequest对象


## 基本的XHR请求
```js

let xhr = new XMLHttpRequest;
xhr.open('get', 'data.json', true);
xhr.onreadystatechange = () => {
    // 该文件记录ajax的状态
    // 0 刚开始
    //  1 OPENED 2 响应头信息返回给客户端 3 loading 4 请求结束（主体信息回来）
    // status 
    if (xhr.readyState === 4 && xhr.status == 200) {
        console.log(xhr.responseText)
    }
}
xhr.send(null) // 请求主体

```


# 请求的两种方式

## GET
给的少，拿得多 比如 user&password 返回整个用户的数据
- get 有大小限制 如果多次传入参数相同，浏览器会缓存，可以加一个哈希值或者page值之类的
- delete
    一般应用于服务器上面的文件或者是大量的数据
- head
    只需要获取响应头的信息，响应主体信息不回接受
- options 
    是一个试探性的请求，经常会用于CORS跨域资源共享的时候，每一个正常的请求发送之前，都会默认发送一个OPTIONS请求，这个请求用来校验客户端和服务端的连接是否正常
## POST
一般认为是给服务器发送信息，同样，服务端给客户端返回信息。给的多，拿得少
- post
- put 和delete对应，一般用于给服务区传递文件和数据 (大文件上传/ 文本编辑器中的东西)

## ajax中有多少个方法？
```js
console.log(xhr.__proto__) // 8个
```
# 常见网络状态码
200 success 
301 永久重定向
302 307 临时重定向
304 协商缓存
400 参数错误
401 无权限访问
403 禁止访问
404 Not Found 无URL
500 服务器错误
503 服务器超负荷 此时用302 等状态来负载均衡

# 数据传输格式
```js
// form-data 文件上传/表单提交

let form = new FormData()
form.append('lx', 0)
form.append('name', 'jun')

xhr.send(form)

// x-www-form-urlencoded  和url中?传递的格式一样
xhr.send('lx=0&name=ajun')


// raw 字符串 JSON/TXT
xhr.send(JSON.stringify({
    lx:0,
    name:'ajun'
}))

// 设置请求头
xhr.setRequestHeader('Content-Type', 'application/json') 


```


# axios, $.ajax, fetch 的区别
$.ajax 和 axios 还是XMLHTTPRequest
fetch不是
axios和fetch都是基于Promise封装的
fetch的性能好，兼容性差
```js
let url = 'http://xx.com.xx.json'
let config = {
    // ...   
}
fetch(url, config)
```





