
// import React from 'react'
// import ReactDOM from 'react-dom'

class Element {
  constructor(type, props, children) {
    this.type = type;
    this.props = props;
    this.children = children;
  }
  changeKey(str) {
    //把驼峰转成烤串
    return str.replace(/[A-Z]/g, function (a) {
      return '-' + a.toLowerCase()
    })
  }
  render() {
    // 返回真实DOM元素
    let ele = document.createElement(this.type);
    Object.keys(this.props || {}).forEach(item => {
      // ele.setAttribute(item, this.props[item])
      switch (item) {
        case 'className':
          ele.setAttribute('class', this.props[item])
          break;
        case 'style':
          let str = '';
          Object.keys(this.props.style).forEach(key => {
            str += `${this.changeKey(key)}:${this.props.style[key]};`
          })
          ele.setAttribute('style', str)
          break;
        default:
          ele.setAttribute(item, this.props[item])
          break;
      }
    })
    this.children.forEach(item => {
      typeof item === 'string' ?
        ele.appendChild(document.createTextNode(item)) :
        ele.appendChild(item.render())
    })

    return ele;
  }
}




let React = {
  createElement(type, props, ...children) {
    console.log(666)
    return new Element(type, props, children)
  }
}
let ReactDOM = {
  render(ele, box) {
    box.appendChild(ele.render())
  }
}



// let ele = <div className='box' style={{ color: 'red', fontSize: '30px' }}>
//   hello<b>bbbb</b>
// </div>


let ele = /*#__PURE__*/React.createElement("div", {
  className: "box",
  style: {
    color: 'red',
    fontSize: '30px'
  }
}, "hello", /*#__PURE__*/React.createElement("b", null, "bbbb"));

/* let ele = React.createElement('div', {
  className: 'box',
  style: { color: 'red', fontSize: '30px' }
}, 'hello', React.createElement('b', null, 'bbbb')) */

ReactDOM.render(ele, document.getElementById('root'))