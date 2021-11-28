
/**
 * 创建store
 * @param {*} reducer 
 * @returns initialState传递的初始值
 * 传递初值有两种方式一种是reducer initialState,一种是createStore preloadState
 * 关于优先级，谁高？记住永远地的原则 写的越晚的越高，离用户越近的越高
 */
function createStore(reducer, preloadState) {
    let state = preloadState;
    let listeners = [];
    function getState() {
        return state;
    }
    function dispatch(action) {
        //根据老状态和action计算新状态
        state = reducer(state, action);
        //然后要通知所有的订阅函数执行
        listeners.forEach(listener => listener());
    }
    function subscribe(listener) {
        listeners.push(listener);
        //返回一个取消订阅的函数
        return () => {
            listeners = listeners.filter(l => l !== listener);
        }
    }
    dispatch({ type: '@@/REDUX_INIT' });
    return {
        getState,
        dispatch,
        subscribe
    }
}
export default createStore;