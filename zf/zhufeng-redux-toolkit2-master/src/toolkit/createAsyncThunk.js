//import { createAction } from "@reduxjs/toolkit";
import { createAction } from "./";
/**
 * 
 * @param {*} typePrefix 动作类型的前缀
 * @param {*} payloadCreator 函数，接收参数并返回一个数据请求的promise
 * @returns 
 */
function createAsyncThunk(typePrefix,payloadCreator){
    //todos/list/pending
    let pending = createAction(typePrefix+'/pending',payload=>{
        return {payload};
    });
    let fulfilled = createAction(typePrefix+'/fulfilled',payload=>{
        return {payload};
    });
    let rejected = createAction(typePrefix+'/rejected',error=>{
        return {error};
    });
    function actionCreator(id){
        //thunk中间件 负责执行此函数
        return function(dispatch,getState){
            dispatch(pending());
            var abort;
            const abortedPromise = new Promise((resolve,reject)=>{
                abort=()=>reject({message:'任务取消了'})
            });
            let promise = payloadCreator(id);
            Promise.race([promise,abortedPromise]).then(result=>{
                return dispatch(fulfilled(result));
            },error=>{
                return dispatch(rejected(error));
            });
            return Object.assign(promise,{abort});
        }
    }
    return Object.assign(actionCreator,{
        pending,
        fulfilled,
        rejected
    });
}

export default createAsyncThunk;