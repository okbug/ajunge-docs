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
