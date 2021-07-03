/* 
  html 结构 也是可以理解成一种数据类型
  只要是现在html结构中 写变量; 就用 {} 抱起来 不管是行内的函数 结构内的
  { 直接写表达式 不能写语句}
  react中 元素的类名 必须使用 className
  不要把普通对象 直接放到 结构当中
  react中的列表循环 可以利用数据禅城一个结构数组  直接展示即可
  判断 一般使用三元表达式
  dangerouslySetInnerHTML={{ __html: str }} 相当于 vue的 v-html
  行内样式   style = {样式对象}
*/
// import './syle.less'
import style from './style.module.less'
console.log(style)

let a = "你好 珠峰";
let id = 'box'
let obj = { name: "珠峰" }
let arr = [1, 2, 3, 4, 5, 6]
let li = <li>哈哈哈</li>
let ary_li = [<li key='1'>哈哈哈</li>, <li key='11'>哈哈哈</li>, <li key='12'>哈哈哈</li>]
let str = '<i>html 字符串</i>'

function fn() {
  let temp = [];
  for (let i = 0; i < arr.length; i++) {
    temp.push(<li key={i}>{arr[i]}</li>)
  }
  return temp
}
let flag = true
export function Hello() {
  let id = style.box2;
  let temp = [];
  for (let i = 0; i < arr.length; i++) {
    temp.push(<li key={i}>{arr[i]}</li>)
  }
  return <>
    <h1 id={id}>hello <i className={style.qqq}>{a}</i></h1>
    <h2>{obj.name}</h2>
    <h3>{arr}</h3>
    <ul>
      {/* {ary_li} */}
      {
        // arr.map(item => {
        //   return <li key={item}>{item}</li>
        // })
        temp
      }

    </ul>

    <h3>
      {
        flag ? "flag 是true" : "flag 是false"
      }
    </h3>

    <h3 dangerouslySetInnerHTML={{ __html: str }}></h3>

    <h2 style={{ fontSize: "39px" }}>样式</h2>
  </>

}