import {updateQueue} from './Component';
/**
 * 给真实DOM添加事件处理函数 
 * 为什么要这么做?合成事件？为什么要做事件委托或者 事件代理
 * 1.做兼容处理 兼容不同的浏览器 不同的浏览器event是不一样的。处理浏览器的兼容 性
 * 2.可以在你写的事件处理函数之前和之后做一些事情，比如修改
 *   之前 updateQueue.isBatchingUpdate = true;
 *   之后 updateQueue.batchUpdate()
 * @param {*} dom 真实DOM
 * @param {*} eventType  事件类型
 * @param {*} listener  监听函数
 */
export function addEvent(dom,eventType,handleClick){
    //我要给dom绑定一个onclick事件回调函数,handleClick
    let store;
    if(dom.store){
        store = dom.store;
    }else{
        dom.store={};
        store=dom.store;
    }
   //let store = dom.store || (dom.store = {});
   store[eventType]=handleClick;//store.onclick = handleClick
   if(!document[eventType]){
    //事件委托，不管你给哪个DOM元素上绑事件，最后都统一代理到document上去了
    document[eventType]=dispatchEvent;//document.onclick=dispatchEvent;
   }
}
let syntheticEvent = {};
//原生的DOM
function dispatchEvent(event){
    let {target,type}= event;//事件源=button那个DOM元素 类型type=click
    let eventType = `on${type}`;//onclick
    updateQueue.isBatchingUpdate = true;//把队列设置为批量更新模式
    createSyntheticEvent(event);
    while(target){
        let {store}=target;
        let handleClick = store&&store[eventType];
        handleClick&&handleClick.call(target,syntheticEvent);
        target=target.parentNode;
    }
    for(let key in syntheticEvent){
        syntheticEvent[key]=null;
    }
    updateQueue.isBatchingUpdate = false;
    updateQueue.batchUpdate();//批量更新一下
}
function createSyntheticEvent(nativeEvent){
    for(let key in nativeEvent){
        syntheticEvent[key]=nativeEvent[key];
    }
}