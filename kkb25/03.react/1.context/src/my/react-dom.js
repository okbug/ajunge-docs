import { addEvent } from './event'

const ReactDOM = {
  render
}

/**
 * 
 * @param {*} vdom 需要渲染的虚拟节点 
 * @param {*} container 在public/index.html 中的真实dom 一般为 document.getElementByID('root')
 */
function render(vdom, container) {
  let dom = createDOM(vdom) // dom 是真实的dom
  container.appendChild(dom)
}

/**
 * 
 * @param {Object} vdom 虚拟dom
 * @return {HTMLElement} dom 真实dom
 */
function createDOM(vdom) {
  if (typeof vdom === 'string' || typeof vdom === 'number') { // <h1>我只是一段文字</h1>
    return document.createTextNode(vdom)
  }
  let { type, props } = vdom // type:'h1',props:{}
  let dom
  if (typeof type === 'function') { // 如果是函数组件
    return type.prototype.isReactComponent ? updateClassComponent(vdom) : updateFunctionComponent(vdom)
  } else { // 如果是普通字符串
    dom = document.createElement(type) // 创建真实DOM元素
  }
  updateProps(dom, props) // 给这个DOM元素加上attributes
  // 处理ChildNodes
  if (typeof props.children === 'string' || typeof props.children === 'number') {
    dom.textContent = props.children // textContent | innerText | innerHTML
  } else if (typeof props.children === 'object' && props.children.type) {
    render(props.children, dom)
  } else if (Array.isArray(props.children)) {// children 是数组
    reconcileChildren(props.children, dom)
  } else {
    dom.textContent = props.children ? props.children.toString() : ''
  }
  // 现在这个dom已经完整了
  return dom

}

function updateFunctionComponent(vdom) {
  let { type, props } = vdom
  // type是函数组件的函数，函数中传入props吧，所以我们直接执行这个函数，并且他的返回值就是一个React虚拟DOM
  let renderedVDOM = type(props) // renderedVDOM 就是CreateElement的返回对象，此时给这个虚拟DOM再转为真实节点就OK
  return createDOM(renderedVDOM)
}

function updateClassComponent(vdom) {
  let { type: classComponent, props } = vdom
  let classInstance = new classComponent(props)
  let renderedVDOM = classInstance.render()
  return createDOM(renderedVDOM)
}

/**
 * 
 * @param {*} children DOM元素中的子节点
 * @param {*} dom 真实DOM HTMLElement
 */
function reconcileChildren(children, dom) {
  for (let i = 0; i < children.length; i++) {
    render(children[i], dom) // 把每一个children都变成真实dom，并且添加在根容器中
  }
}

/**
 * 更新除了children以外其他的attributes
 * @param {*} dom  真实的DOM元素
 * @param {*} props attributes or 标签中的内容
 */
function updateProps(dom, props) {
  for (let key in props) {
    if (key === 'children') {
      continue
    } else if (key === 'style') { // 处理是style的情况
      let style = props[key]
      for (let attr in style) {
        dom.style[attr] = style[attr] // dom.style['color'] = 'red' 这是DOM的固有方法，所以要这样做
      }
    } else if(key.startsWith('on')) {
      addEvent(dom, key.toLowerCase(), props[key])
    } else {
      dom[key] = props[key]
    }
  }
}
export default ReactDOM