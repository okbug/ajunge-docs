/* 
  元素上的类名 需要使用 className
  结构中的变量或者表达式  必须使用{} 包含起来
  对象不能直接放到结构中使用
  列表循环 产生一个结构数组 然后直接把数组扔进去即可
  判断的编写  直接写一个判断即可
  行内样式 必须是 style={对象}
  dangerouslySetInnerHTML={{ __html: 结构字符串 }}
  class类名 用 className
  for 用 htmlFor
*/
import React from 'react'

let htmlStr = `<h1><i>hahhaha</i></h1>`

export function Hello1() {
  let name = '珠峰';
  let h1 = <h1>hahaha{name}</h1>;
  let obj = {
    a: name,
    b: h1
  }
  let ary = [111, 2222, 333, 444]
  let ary2 = [<i key='1'>111</i>, <i key='2'> 222</i >]
  let temp = [];
  for (let i = 0; i < ary.length; i++) {
    temp.push(<b key={i}>{ary[i]}</b>)
  }
  function fn(n) {
    return n > 2 ? <h1 style={{ color: '#000' }}>大于2</h1> : <h2>小于2</h2>
  }
  var sty = { color: 'red', fontSize: '30px' }
  return <div className='box' style={sty}>
    你好 {name}
    {h1}
    {ary}
    {ary2}
    {
      ary.map(item => <b key={item}>{item}</b>)
    }
    {temp}
    {
      1 < 2 ? <h1>错误</h1> : <h2>du</h2>
    }
    {fn(4)}

    {fn(1)}

    <div dangerouslySetInnerHTML={{ __html: htmlStr }}></div>

    <input type="checkbox" id='qqq' /><label htmlFor='qqq'>hahaha</label>
  </div>
}

export function Hello2() {
  var a = React.createElement("h1", {
    className: "box"
  }, "hello world");
  var b = <h1 className='box'>hello world</h1>
  return <div>世界 {a}  {b}</div>
}

function hello() {
  return <h1>hello</h1>
}

export class Hello3 extends React.Component {
  render() {
    return <h1>hello3</h1>
  }
}

export default hello