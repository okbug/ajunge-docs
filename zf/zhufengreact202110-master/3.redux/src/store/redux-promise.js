/**
 * 
 * @param {*} getState 获取状态的函数
 * @returns dispatch是改造后的dispatch函数
 */
function promise({ getState, dispatch }) {
    return function (next) {
        return function (action) {//成为我们改造后的dispatch方法
            if (action.then && typeof action.then === 'function') {
                return action.then(dispatch);
            } else if (action.payload && action.payload.then && typeof action.payload.then === 'function') {
                action.payload
                    .then(payload => dispatch({ ...action, payload }))//{type:'add1',payload:.8}
                    .catch(error => {//error .3
                        //在reducer里可以通过action里有没有error:true属性来判断是成功还是失败了
                        dispatch({ ...action, payload: error, error: true });
                        return Promise.reject(error);
                    })
            } else {
                next(action);
            }
        }
    }
}
export default promise;