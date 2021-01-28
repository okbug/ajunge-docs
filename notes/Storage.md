cookie localStorage sessionStorage IndexDB

# cookie

## 如何设置cookie
```js
// "name=value;domain=www.mydomain.com;path=/;expires=Tue, 01 Sep 2020 07:29:10 GMT;HttpOnly;secure"
document.cookie = someCookies
```

## cookie的格式
key=value 键值对(required)
path = / or some other path
domain = www.qq.com
max-age=max-age-in-seconds
expires=date-in-GMTString-format
secure 如果设置 那么只会在SSH连接的时候才会传回cookie

> **cookie的值字符串可以用encodeURIComponent()来保证它不包含任何逗号、分号或空格(cookie值中禁止使用这些值).**

## cookie的删除
只需要设置 expires 参数为以前的时间即可

`document.cookie = "name=; expires=Thu, 01 Jan 1970 00:00:00 GMT";`

## session以及cookie和session的关系

Session保存在服务器端 所以如果session太多 不好 得简化session
用户第一次访问服务器的时候： -> 服务器创建session 如果用户继续访问 -> 服务器 update session
if 长时间没有访问的session 删除 这个长时间 是设置的超时时间 超过这个时间 session自动失效



# localStorage

## 使用
```js
localStorage.setItem('someKey', 'SomeValue');

let cat = localStorage.getItem('someKey') // cat = 'someValue'

// 移除单个选项
localStorage.removeItem('someKey')

// 移除所有
localStorage.clear()

```

## 特点
永远保留 是在用户的浏览器中， 可以在console台中查看 并且不同的域名和不同的协议都是单独存储的

# sessionStorage

它允许你访问对应当前源的 `sessionStorage` 对象.它与localStorage类似 但是在其中的数据会在页面被关闭后清除。
如果是重新加载或者是 浏览器崩溃时让你选择的恢复页面 仍然是保持原来的会话


## sessionStorage的使用
```js
let s = sessionStorage // 单词太长了..
s.setItem('key', 'value')

let res = s.getItem('key') // res = 'value'

s.removeItem('key')

s.clear()
/* 总体的使用和localStorage类似 就是会话的过期方式不一样 */

```

# IndexDB
 这是一个运行在浏览器中的事务型数据库系统，用于在客户端存储大量的结构化数据
 理论上来说： IndexDB是没有存储上限的

 ## IndexDB的忒点

- 键值对存储
- 异步 在操作的时候不会锁死浏览器(localStorage是同步的) 为了防止大量数据读写时，对网页增加负担。
- 支持 事务(transcation) 一系列的操作中，只要有一部分取消，全部取消，数据库回滚到事务发生之前的状态，不会存在某些数据在一系列操作中只改了前头的情况

- 存储空间大 一般来说不少于250MB 甚至没有上限
- 支持二进制存储 (Blob,ArrayBuffer 等对象)

## IndexDB的使用


### 打开 or 创建一个IndexDB数据库

```js
let db;
const request = window.indexedDB.open(/* DBname */'someDBs', /* version */1)
request.onerror = function(event) {
  console.log('error', event) // 处理错误
}
request.onsuccess = function(data) {
  db = data.target.result
  console.log('成功打开',db)
}
```

### 创建一个object store (类似数据库中的表)

```js
request.onupgradeneeded = function(event) {
  let objectStore;
  if(!db.objectStoreNames.contains('test')) {
    objectStore = db.createObjectStore('test', { keyPath: 'id' })
  }
}
```



# 四者的比较

| 分类 | 生命周期 | 存储容量 | 存储位置 |
| :---: | :---: | :---: | :---: |
| cookie | 默认保存在内存中，随浏览器关闭失效（如果设置过期时间，在到过期时间后失效） | 4KB    | 	保存在客户端，每次请求时都会带上 |
| localStorage     | 理论上永久有效的，除非主动清除。 | 4.98MB（不同浏览器情况不同，safari 2.49M） | 保存在客户端，不与服务端交互。节省网络流量 |
| sessionStorage     | 仅在当前网页会话下有效，关闭页面或浏览器后会被清除。 | 4.98MB（部分浏览器没有限制） |  同上
| IndexDB     |理论上永久有效的，除非主动清除。 | 基本无限制 | 同上 |


# 参考链接

> https://juejin.cn/post/6893858445485670413 