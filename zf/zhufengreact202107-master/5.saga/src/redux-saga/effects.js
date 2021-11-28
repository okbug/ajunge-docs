
import *  as effectTypes from './effectTypes';
//等待actionType派发
export function take(actionType){
    return {type:effectTypes.TAKE,actionType};
}
//直接向仓库 派发action
export function put(action){
    return {type:effectTypes.PUT,action};
}
export function select(selector){
    return {type:effectTypes.SELECT,selector};
}

export function fork(saga){
    //如果遇到了fork指令，意思着要开启一个新的子进程 执行saga
    return {type:effectTypes.FORK,saga};
}

export function takeEvery(actionType,saga){
    function * takeEveryHelper(){
        while(true){
            yield take(actionType);
            yield fork(saga);
        }
    }
    return fork(takeEveryHelper);
}
export function call(fn,...args){
    return {type:effectTypes.CALL,fn,args};
}
export function cps(fn,...args){
    return {type:effectTypes.CPS,fn,args};
}
export function all(effects){
    return {type:effectTypes.ALL,effects};
}

export function cancel(task){
    return {type:effectTypes.CANCEL,task};
}

export function delayP(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms);
    });
}
export const delay = call.bind(null,delayP);