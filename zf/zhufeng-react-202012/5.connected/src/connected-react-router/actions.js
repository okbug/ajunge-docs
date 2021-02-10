
import {CALL_HISTORY_METHOD,LOCATION_CHANGE} from './action-types';
/**
 * 这是一个用来跳转路径的actionCreator
 * push 是一个方法，会返回一个action
 * @param {*} path 要跳转换路径
 */
export function push(path){
   return {
       // history.push(path);
       type:CALL_HISTORY_METHOD,//调用历史对象的方法
       payload:{//携带的额外的数据
           method:'push',
           args:[path]
       }
   }
}
/**
 * 路径变化的actionCreator
 * @param {}} location 
 * @param {*} action 
 */
export function locationChange(location,action){
    return {
        type:LOCATION_CHANGE,
        payload:{
            location,
            action
        }
    }
}
