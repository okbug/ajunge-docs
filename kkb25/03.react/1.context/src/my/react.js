import Component from './Component'
/**
 * 
 * @param {*} type h1, h2 or other
 * @param {*} config id,className,style or other
 * @param {*} children 在组件开始和结束标签中的东西 比如 <h1>**</h1> ** 即children
 */
export function createElement(type, config, children) {
  let props = {...config}
  if(arguments.length > 3) { // 这里是处理children数量，如果只有一个儿子，那么就是单个对象或者字符串否则就是一个数组
    children = [].slice.call(arguments, 2) // 2是type和 config. 截取他们之后的东西
  }
  props.children = children
  /* 
  个人的一个新理解:
  在一个标签中所有的东西其实都是prop
  如果是普通的标签，就将props视为attributes
  如果是一个组件，那么传入的东西就是props，并且props中有一个特殊的属性为children，他是标签中，闭合区间内的东西
  其实还是相当于在开始标签中传入一个名字为children的attribute，最后变成了props中的一项
  并且我们在组件化开发的过程中，经常直接render children，说明，children就是props中的一项
  而且这个children是在<> *children* </>之间的组件或者是字符串
  */
  return {
    type,
    props
  }
}
export function createContext() {
  let value;
  function Provider(props) {
    value = props.value
    return props.children
  }
  function Consumer(props) {
    return props.children(value)
  }
  return {
    Provider,
    Consumer
  }
}
const React = {
  createElement,
  Component,
  createContext
}
export default React