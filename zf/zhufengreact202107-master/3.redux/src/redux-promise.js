/**
 * dispatch 重新派发
 * next 下一步
 * @param {*} param0 
 * @returns 
 */
function promise({ getState, dispatch }) {
    return function (next) {//调用下一个中间件 next=store.原始的dispatch方法
        return function (action) {//这个就是改造后的dispatch
            if (action.then && typeof action.then === 'function') {
                action.then(dispatch).catch(dispatch);
            } else if (action.payload && typeof action.payload.then === 'function') {
                action.payload
                .then(payload=>dispatch({...action,payload}))
                .catch(error=>{
                    dispatch({...action,error:true,payload:error});
                    return Promise.reject(error);
                })
            } else {
                next(action);
            }
        }
    }
}
export default promise;