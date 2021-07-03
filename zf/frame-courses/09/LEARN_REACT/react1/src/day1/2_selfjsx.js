
// import React from 'react';
// import ReactDOM from 'react-dom';

// let ele = <h1 className='box' style={{ color: 'red' }}>hello <i>world</i></h1>

class Element {
  constructor(type, props, children) {
    this.type = type;
    this.props = props;
    this.children = children
  }
  tuofeng(str) {
    return str.replace(/[A-Z]/g, (k) => {
      return '-' + k.toLowerCase()
    })
  }
  render() {
    // 负责创造并返回真实的DOM元素
    let ele = document.createElement(this.type) // 创造DOM元素

    //  把行内属性加上
    this.props && Object.keys(this.props).forEach(key => {
      // ele.setAttribute(key, this.props[key])
      switch (key) {
        case "className":
          ele.setAttribute('class', this.props[key])
          break;
        case 'style':
          let obj = this.props[key]; //{color:'red'}
          let str = '';
          Object.keys(obj).forEach(k => {
            str += `${this.tuofeng(k)}:${obj[k]};`
          })
          ele.setAttribute('style', str)
          break;
        default:
          break;
      }
    })


    //  儿子处理
    this.children.forEach(child => {
      // 儿子有两种情况 一种是  字符串 另外一种是 createElement的返回结果(Element这个类的实例)
      if (typeof child == 'string') {
        let textNode = document.createTextNode(child);
        ele.appendChild(textNode)
      } else {
        // child是ELement的一个实例
        ele.appendChild(child.render())
      }
    })

    return ele
  }
}

let React = {
  createElement(type, props, ...children) {
    return new Element(type, props, children)
  }
}
let ReactDOM = {
  render(ele, box) {
    // ele 是Element的一个实例
    console.log(ele)
    box.appendChild(ele.render())
  }
}

var ele = React.createElement(
  "h1",
  {
    className: "box",
    style: {
      color: "red",
      fontSize: '30px'
    }
  },
  "hello ",
  React.createElement("i", null, "world")
);

ReactDOM.render(
  ele,
  document.getElementById('root')
);