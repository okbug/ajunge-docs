/* @flow */
/* globals MutationObserver */

import { noop } from 'shared/util'
import { handleError } from './error'
import { isIE, isIOS, isNative } from './env'

export let isUsingMicroTask = false;// 是否使用 微任务

const callbacks = [];// 是个事件池
let pending = false;// 是否是在等待期

function flushCallbacks() { //清空事件池  让事件池中的函数挨个执行了
  pending = false
  const copies = callbacks.slice(0);// 里边的内容 就是callbacks里边的内容
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]() // 让 callback里边的函数都执行了
  }
}


let timerFunc;

// if elseif  .. 这些都是为了创建一个异步
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  const p = Promise.resolve()
  timerFunc = () => {
    p.then(flushCallbacks)// 吧flushCallbacks函数放到了一个异步微任务的地方执行
    if (isIOS) setTimeout(noop)
  }
  isUsingMicroTask = true
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  let counter = 1
  const observer = new MutationObserver(flushCallbacks)
  // 、flushCallbacks 什么是个执行  当节点内容发生改变的时候执行
  const textNode = document.createTextNode(String(counter))
  observer.observe(textNode, {
    characterData: true
  })
  timerFunc = () => {
    counter = (counter + 1) % 2
    textNode.data = String(counter)
  }
  isUsingMicroTask = true
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else {
  // Fallback to setTimeout.
  timerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}


export function nextTick(cb, ctx) {
  let _resolve
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e) {
        handleError(e, ctx, 'nextTick')
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  }) // 是向数组中 添加一个函数
  if (!pending) {
    pending = true
    timerFunc()// flushCallbacks 这个函数先等着
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(resolve => {
      _resolve = resolve
    })
  }
}

/*
  首先 nextTick是为了做出一个异步的操作，
  这里利用了事件池， 吧用户传给nextTick的回调函数(实际是在用户的回调函数的基础上又套了一层函数) 放到事件池中，
  放完之后 ，让pending变成true; 让 一个timerFunc函数执行， 这个timerFunc函数 里边调用了一个异步（优先使用微任务 没有再用红任务）函数
  在异步函数中 执行了 flushCallbacks，flushCallbacks执行的时候  就是把pending 变成了false;让事件池中的所有函数挨个执行
  并且清空了 事件池；

  pending的作用   第一次执行nextTick的时候 吊起了异步(不管怎么底 都要等着同步执行完成)，也就是说
  下边的nextTick调用  不会在启用新的异步了 只是淡纯的相 事件池中添加事件
*/
