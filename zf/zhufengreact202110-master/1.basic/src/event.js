
import { updateQueue } from './component';
/**
 * 
 * @param {*} dom 要绑定事件的DOM元素  button
 * @param {*} eventType 事件类型 onclick
 * @param {*} handler 事件处理函数 handleClick
 */
export function addEvent(dom, eventType, handler) {
  //保证dom有store属性，值初始化是一个空对象 store是一个自定义属性
  /*   let store;
    if(dom.store){
      store = dom.store;
    }else{
      store = dom.store = {};
    } */
  let store = dom.store || (dom.store = {})
  //dom.store['onclick']=handleClick
  store[eventType] = handler;//虽然没有给每个子DOM绑定事件，但是事件处理函数还是保存在子DOM上的
  //从17开始，我们不再把事件委托给document.而是委托给容器了 div#root
  if (!document[eventType]) {
    document[eventType] = dispatchEvent;
  }
}
//合成事件的统一代理处理函数
function dispatchEvent(event) {
  let { target, type } = event;//target=button type =click
  let eventType = `on${type}`;//onclick
  let syntheticEvent = createSyntheticEvent(event);
  updateQueue.isBatchingUpdate = true;//事件函数执行前先设置批量更新模式为true
  //在此我们要模拟React事件的冒泡
  while (target) {
    let { store } = target;
    let handler = store && store[eventType]
    handler && handler(syntheticEvent);
    //在执行handler的过程中有可能会阻止冒泡
    if (syntheticEvent.isPropagationStopped) {
      break;
    }
    target = target.parentNode;
  }
  updateQueue.isBatchingUpdate = false;
  updateQueue.batchUpdate();
}
/**
 * 为什么React不会原生事件对象直接传给事件处理函数
 * 1.为了兼容性 像jquery一样，抹平浏览器的差异
 * @param {*} nativeEvent 
 * @returns 
 */
function createSyntheticEvent(nativeEvent) {
  let syntheticEvent = {};
  for (let key in nativeEvent) {//把原生事件上的属性拷贝到合成事件对象上去
    syntheticEvent[key] = nativeEvent[key];
  }
  syntheticEvent.nativeEvent = nativeEvent;
  syntheticEvent.isDefaultPrevented = false;
  syntheticEvent.isPropagationStopped = false;
  syntheticEvent.preventDefault = preventDefault;
  syntheticEvent.stopPropagation = stopPropagation;
  return syntheticEvent;
}

function preventDefault() {
  this.defaultPrevented = true;
  const event = this.nativeEvent;
  if (event.preventDefault) {
    event.preventDefault();
  } else {//IE
    event.returnValue = false;
  }
  this.isDefaultPrevented = true;
}

function stopPropagation() {
  const event = this.nativeEvent;
  if (event.stopPropagation) {
    event.stopPropagation();
  } else {//IE
    event.cancelBubble = true;
  }
  this.isPropagationStopped = true;
}