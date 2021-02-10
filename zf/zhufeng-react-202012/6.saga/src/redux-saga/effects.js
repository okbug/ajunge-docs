import * as effectTypes from './effectTypes';
export function take(actionType){
    //返回值是一个普通对象，我们称为指令对象
    return {type:effectTypes.TAKE,actionType};
}
export function put(action){
    return {type:effectTypes.PUT,action};
}
/**
 * 以新的子进程的方式执行saga
 * @param {*} saga 
 */
export function fork(saga){
    return {type:effectTypes.FORK,saga}
}
/**
 * 等待每一次的actionType派发，然后以单独的子进程去调用saga
 * @param {*} actionType 
 * @param {*} saga 
 */
export function takeEvery(actionType,saga){
  function * takeEveryHelper(){
    //写了一个死循环，
      while(true){
        let action = yield take(actionType);//等待一个新的动作类型
        yield fork(function*(){
          yield saga(action);
        });//开启一个新的子进程执行saga
      }
  }
  //会开一个新的子进程执行 takeEveryHelper这个saga
  //FORK的effect
  return fork(takeEveryHelper);
}

export function call(fn,...args){
  return {type:effectTypes.CALL,fn,args}
}

export function cps(fn,...args){
  return {type:effectTypes.CPS,fn,args}
}
/**
 * 
 * @param {*} effects 是一个iterator的数组
 */
export function all(effects){
  return {type:effectTypes.ALL,effects};
}
export function cancel(task){
 return {type:effectTypes.CANCEL,task};
}
export function select(selector){
  return {type:effectTypes.SELECT,selector};
 }
function delayP(ms){
  const promise = new Promise(resolve=>{
    setTimeout(resolve,ms);
  });
  return promise;
}
export const delay = call.bind(null,delayP);
//delay(ms)= call(delayP,ms);