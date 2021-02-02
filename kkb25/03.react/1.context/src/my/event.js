/**
 * 
 * @param {*} dom 真实的dom元素
 * @param {*} eventType 事件的类型
 * @param {*} listener 事件的回调函数
 */
export function addEvent(dom, eventType, listener) {
  let store = dom.store || (dom.store = {})
  store[eventType] = listener
  document.addEventListener(eventType.slice(2), dispatchEvent, false)
}

let syntheticEvent = {}

function dispatchEvent(event) {
  let { target, type } = event
  let eventType = 'on' + type
  let { store } = target
  let listener = store && store[eventType]
  if (listener) {
    syntheticEvent.nativeEvent = event
    for(let key in event) {
      syntheticEvent[key] = event[key]
    }
    listener.call(target, syntheticEvent)
    for(let key in syntheticEvent) {
      syntheticEvent[key] = null
    }
  }
}