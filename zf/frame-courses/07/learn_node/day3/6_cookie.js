//  session  token
// cookie  localStorage  sessionStorage  有跨域


//cookie 是浏览器的一个存储空间
//  前端后端都能操作   会随着请求 发送给后端
// domain  域名    www.baidu.com     .baidu.com
// path 当前cookie哪个路径下能访问  默认/  /就是素有的路径都能访问
// expires(时间戳)  max-age（毫秒数）  过期时间   谁先到 谁起作用 
// http-only  只能后端能操作 前端获取不到

// 跨域携带cookie   1- 前端设置  credentials（fetch ） withCredentials(axios)
//                 2- 后端设置   access-control-allow-origin： xxx;access-control-allow-credentials :true


// token 后端给前端传递的一个字段  前端一般是存储在localStorage
//  以后每次请求 都要把这个token在传递给后端（1-直接放到参数中传递  2- 放到请求头当中）
// token的过期时间 生成token的时候会直接内置 时间


// session是后端存储登录信息的一个地方（就是后端的一个cookie）