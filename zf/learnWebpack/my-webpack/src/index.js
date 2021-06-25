/*
webpack处理普通文件，css，scss，less，图片等使用的代码
import "./index.css";
import "./less.less";
import "./sass.scss";

let hello = require("./hello.txt")
console.log(hello)
// document.body.appendChild(hello)
// 支持图片
let logo = require("./images/img.png")
let image = new Image()
image.src = logo.default;
document.body.appendChild(image)
* */

/*
*  webpack处理JS的代码
* */

// 对React JSX的支持
// import React from 'react'

// import ReactDOM from 'react-dom'

// function App() {
//     return (<>
//         <h1>Hello App</h1>
//     </>)
// }

// ReactDOM.render(<App />, document.getElementById("app"))

// target 装饰的目标
// key 装饰的属性
// desc 配置



// 对装饰器的支持
// function readonly (target, key, desc) {
//     desc.writable = true
// }

// class Person {
//     @readonly PI = 3.14
// }

// let p = new Person()
// console.log(p)
// p.PI = 3.15
// console.log(p)

require("@babel/polyfill")
let p = new Promise((resolve) => {
    resolve(1)
})
p.then((data) => {
    console.log(data)
})


