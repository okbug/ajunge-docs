/**
 * 
 * @param {*} getState 获取状态的函数
 * @returns dispatch是改造后的dispatch函数
 */
function thunk({ getState, dispatch }) {
    return function (next) {
        return function (action) {//成为我们改造后的dispatch方法
            if (typeof action === 'function') {
                //执行此函数，并且传入dispatch和getState
                return action(dispatch, getState);
            }
            //执行原始的store.dispatch方法
            return next(action);
        }
    }
}
export default thunk;